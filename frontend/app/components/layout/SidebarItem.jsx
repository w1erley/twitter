'use client';

import { useCallback } from 'react';

import Link from "next/link";

// import useCurrentUser from '@/hooks/useCurrentUser';
// import { BsDot } from 'react-icons/bs';

const SidebarItem = ({ label, icon: Icon, href, auth, onClick }) => {

  // const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
  }, [href, auth, onClick]);

  return (
    <li onClick={handleClick} className="d-flex flex-row align-items-center">
      <Link
        href={href}
        className="
          position-relative
          d-none
          d-lg-flex
          align-items-center
          gap-4
          px-3
          rounded-pill
          cursor-pointer
          bg-opacity-10
        "
      >
        <Icon size={28} color="white" />
        <span className="d-lg-block text-white fs-5 fw-light nav-link mb-0 px-2">
          {label}
        </span>
        {/* {alert ? <BsDot className="text-primary position-absolute" size={70} /> : null} */}
      </Link>
    </li>
  );
}

export default SidebarItem;
