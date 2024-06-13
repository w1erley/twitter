'use client';

import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { FiSettings } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";

// import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar = ({username}) => {
  // const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/dashboard',
    },
    {
      icon: FaMagnifyingGlass,
      label: 'Explore',
      href: '/explore',
    },
    // {
    //   icon: BsBellFill,
    //   label: 'Notifications',
    //   href: '/notifications',
    //   auth: true,
    //   alert: currentUser?.hasNotification
    // },
    {
      icon: FiSettings,
      label: 'Settings',
      href: `/settings`,
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/${username}`,
    },
  ]

  return (
    <div className="card overflow-hidden">
        <div className="card-body pt-3">
          <div className="">
            <SidebarLogo/>
            <ul className="nav nav-link-secondary flex-column fw-bold gap-2 my-2">
              {items.map((item) => (
                <SidebarItem
                  alert={item.alert}
                  auth={item.auth}
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </ul>
            <div className="mb-4 mt-4">
              <SidebarItem onClick={() => signOut()} icon={BiLogOut} href="#" label="Logout"/>
            </div>
            <SidebarTweetButton/>
          </div>
        </div>
      </div>
  )
};

export default Sidebar;
