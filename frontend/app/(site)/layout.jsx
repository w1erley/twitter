import Layout from '../components/Layout';

export default async function RootLayout({children, modal})
{
  // const user = await getCurrentUser();

  // if (!user) {
  //   signOut();
  // }

  return (
    <>
      <Layout>
        {/* {JSON.stringify(user)} */}
        {children}
      </Layout>
      {modal}
    </>
  )
}
