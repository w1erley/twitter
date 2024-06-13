import UserPage from "./components/UserPage";

const UserProfile = async ({params}) => {
  return (
    <UserPage username={params.username}/>
  );
}

export default UserProfile;
