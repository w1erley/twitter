

// import { useEffect } from "react";

// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";

import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  // const session = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (session?.status === 'authenticated') {
  //     router.push('/dashboard');
  //   }
  // }, [session?.status, router]);

  return (
    <div
      className="
        d-flex
        min-vh-100
        flex-column
        justify-content-center
        py-3
        py-sm-4
        py-lg-5
        px-4
      "
    >
      <div className="mx-auto w-100" style={{maxWidth: 28+"rem"}}>
        <Image
          alt="Logo"
          height="48"
          width="48"
          className="mx-auto d-block"
          src="/images/logo.png"
        />
        <h2
          className="
            d-block
            mt-3
            text-center
            text-3xl
            font-bold
            tracking-tight
            text-gray-900
          "
        >
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  )
}
