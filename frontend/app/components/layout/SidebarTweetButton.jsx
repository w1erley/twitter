'use client';

import { useCallback } from "react";
import { useRouter } from "next/navigation";

// import useLoginModal from "@/hooks/useLoginModal";
// import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarTweetButton = () => {
  const router = useRouter();
  // const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    // if (!currentUser) {
    //   return loginModal.onOpen();
    // }

    router.push('/');
  }, [router]);

  return (
    <div onClick={onClick} className="mt-4">
      <div className="
        mt-4 mt-lg-0
        d-none
        d-lg-block
        px-4
        py-2
        rounded-pill
        bg-primary
        cursor-pointer
        transition
        hover-opacity-90
      ">
        <p
          className="
            text-center
            font-weight-bold
            text-white
            fs-5
            mb-0
        ">
          Tweet
        </p>
    </div>
  </div>

  );
};

export default SidebarTweetButton;
