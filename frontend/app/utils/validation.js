import { getRandomId } from './random';

const IMAGE_EXTENSIONS = [
  'apng',
  'avif',
  'gif',
  'jpg',
  'jpeg',
  'jfif',
  'pjpeg',
  'pjp',
  'png',
  'svg',
  'webp'
];

const MEDIA_EXTENSIONS = [
  ...IMAGE_EXTENSIONS,
  'mp4',
  'mov',
  'avi',
  'mkv',
  'webm'
];

function isValidImageExtension(extension) {
  return IMAGE_EXTENSIONS.includes(
    extension.split('.').pop()?.toLowerCase()
  );
}

function isValidMediaExtension(extension) {
  return MEDIA_EXTENSIONS.includes(
    extension.split('.').pop()?.toLowerCase()
  );
}

export function isValidImage(name, bytes) {
  return isValidImageExtension(name) && bytes < 20 * Math.pow(1024, 2);
}

export function isValidMedia(name, size) {
  return isValidMediaExtension(name) && size < 50 * Math.pow(1024, 2);
}

export function isValidUsername(username, value) {
  if (value.length < 4)
    return 'Your username must be longer than 4 characters.';
  if (value.length > 15)
    return 'Your username must be shorter than 15 characters.';
  if (!/^\w+$/i.test(value))
    return "Your username can only contain letters, numbers and '_'.";
  if (!/[a-z]/i.test(value)) return 'Include a non-number character.';
  if (value === username) return 'This is your current username.';

  return null;
}

export function getImagesData(files, options = {}) {
  const { currentFiles, allowUploadingVideos } = options;
  if (!files || !files.length) return null;

  const singleEditingMode = currentFiles === undefined;

  const rawImages =
    singleEditingMode ||
    !(currentFiles === 4 || files.length > 4 - currentFiles)
      ? Array.from(files).filter(({ name, size }) =>
          allowUploadingVideos
            ? isValidMedia(name, size)
            : isValidImage(name, size)
        )
      : null;

  if (!rawImages || !rawImages.length) return null;

  const imagesId = rawImages.map(({ name }) => {
    const randomId = getRandomId();
    return {
      id: randomId,
      name: name === 'image.png' ? `${randomId}.png` : null
    };
  });

  const imagesPreviewData = rawImages.map((image, index) => ({
    id: imagesId[index].id,
    src: URL.createObjectURL(image),
    alt: imagesId[index].name ?? image.name,
    type: image.type
  }));

  const selectedImagesData = rawImages.map((image, index) =>
    renameFile(image, imagesId[index].id, imagesId[index].name)
  );

  return { imagesPreviewData, selectedImagesData };
}

function renameFile(file, newId, newName) {
  return Object.assign(
    newName
      ? new File([file], newName, {
          type: file.type,
          lastModified: file.lastModified
        })
      : file,
    { id: newId }
  );
}
