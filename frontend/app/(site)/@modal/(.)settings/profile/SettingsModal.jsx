'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { getImagesData } from "../../../../utils/validation";
import Modal from '../../../../components/Modal';
import EditModal from '../../../../components/modal/EditModal';
import { InputField } from '../../../../components/input/input-field';
import useUser from '../../../../hooks/useUser';

const SettingsModal = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editUserData, setEditUserData] = useState({
    bio: '',
    name: '',
    photoURL: '',
    coverPhotoURL: '',
  });
  const [userImages, setUserImages] = useState({
    photoURL: [],
    coverPhotoURL: [],
  });

  useEffect(() => {
    const fetchUserId = async () => {
      setIsLoading(true);
      try {
        const session = await getSession();
        const response = await axios.get(`/api/users/username/${session.user.username}`);
        setUserId(response.data.id);
      } catch (err) {
        console.error("Couldn't fetch user id");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, []);

  const { data: user, isLoading: isUserLoading, mutate: mutateUser } = useUser(userId);

  useEffect(() => {
    if (user) {
      const { bio, name, image: photoURL, coverPhotoURL } = user;
      setEditUserData({
        bio,
        name,
        photoURL,
        coverPhotoURL,
      });
    }
  }, [user]);

  useEffect(() => {
    console.log("USER OBJECT", user);
    return cleanImage;
  }, []);

  const inputNameError = !editUserData.name?.trim() ? "Name can't be blank" : '';

  const closeModal = () => router.back();

  const saveData = async (newImages) => {
    const trimmedKeys = ['name', 'bio'];

    const trimmedTexts = trimmedKeys.reduce(
      (acc, curr) => ({ ...acc, [curr]: editUserData[curr]?.trim() ?? null }),
      {}
    );

    const newUserData = {
      ...editUserData,
      ...trimmedTexts,
      ...newImages,
    };

    console.log('editUserData', editUserData);
    console.log('newUserData', newUserData);

    try {
      await axios.post('/api/profile/update', {
        name: newUserData.name,
        bio: newUserData.bio,
        image: newUserData.photoURL,
      });
    } catch (err) {
      toast.error('Something went wrong!');
      console.log(err);
    }

    return newUserData;
  };

  const updateData = async () => {
    let newImages;
    let newUserData;

    const { photoURL } = userImages;
    const file = photoURL[0];

    if (photoURL.length > 0) {
      const formData = new FormData();
      formData.append('image', file);

      console.log("formdata", ...formData);
      console.log("photo url [0]", file);

      try {
        const { data: newPhotoURL } = await axios.put('/api/profile/upload_image', formData, {
          headers: { 'content-type': 'multipart/form-data' }
        });

        console.log('newPhotoURL', newPhotoURL);

        newImages = {
          ...(newPhotoURL && { photoURL: newPhotoURL })
        };

        console.log('newImages', newImages);
      } catch (err) {
        toast.error('Something went wrong!');
        console.log(err);
        return;
      }
    }

    newUserData = await saveData(newImages);
    setEditUserData(newUserData);

    mutateUser();

    closeModal();
    cleanImage();
    toast.success('Profile updated successfully');
  };

  const editImage = (type) => ({ target: { files } }) => {
    const imagesData = getImagesData(files);
    console.log("IMAGES DATA", imagesData);

    if (!imagesData) {
      toast.error('Please choose a valid GIF or Photo');
      return;
    }

    const { imagesPreviewData, selectedImagesData } = imagesData;

    const targetKey = type === 'cover' ? 'coverPhotoURL' : 'photoURL';
    const newImage = imagesPreviewData[0].src;

    setEditUserData({
      ...editUserData,
      [targetKey]: newImage,
    });

    setUserImages({
      ...userImages,
      [targetKey]: selectedImagesData,
    });
  };

  const removeCoverImage = () => {
    setEditUserData({
      ...editUserData,
      coverPhotoURL: null,
    });

    setUserImages({
      ...userImages,
      coverPhotoURL: [],
    });

    URL.revokeObjectURL(editUserData.coverPhotoURL ?? '');
  };

  const cleanImage = () => {
    const imagesKey = ['photoURL', 'coverPhotoURL'];

    imagesKey.forEach((image) => URL.revokeObjectURL(editUserData[image] ?? ''));

    setUserImages({
      photoURL: [],
      coverPhotoURL: [],
    });
  };

  const handleChange = (key) => ({ target: { value } }) => {
    setEditUserData({ ...editUserData, [key]: value });
  };

  const inputFields = [
    {
      label: 'Name',
      inputId: 'name',
      inputValue: editUserData.name,
      inputLimit: 50,
      errorMessage: inputNameError,
    },
    {
      label: 'Bio',
      inputId: 'bio',
      inputValue: editUserData.bio,
      inputLimit: 160,
      useTextArea: true,
    },
  ];

  return (
    <Modal>
      <EditModal
        name={editUserData.name}
        title={"Edit profile"}
        action={"Save"}
        photoURL={editUserData.photoURL}
        coverPhotoURL={editUserData.coverPhotoURL}
        editImage={editImage}
        updateData={updateData}
        removeCoverImage={removeCoverImage}
      >
        {inputFields.map((inputData) => (
          <InputField
            {...inputData}
            handleChange={handleChange(inputData.inputId)}
            key={inputData.inputId}
          />
        ))}
      </EditModal>
    </Modal>
  );
};

export default SettingsModal;
