'use client';

import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className="
        rounded-full
        h-14
        w-14
        px-3
        mb-3
        mt-1
        flex
        items-center
        justify-center
        hover:bg-blue-300
        hover:bg-opacity-10
        cursor-pointer
    ">
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;
