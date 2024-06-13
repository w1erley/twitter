import getSession from "./getSession";

export const getToken = async () => {
  const session = await getSession();
  return session?.accessToken;
};
