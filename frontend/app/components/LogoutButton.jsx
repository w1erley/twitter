"use client"

import React from 'react'
// import Button from '@/app/components/Button'
import Button from './Button';
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleClick = () => {
    console.log(10);
    return ()=>signOut();
  };

  return (
    <Button onClick={()=>signOut()}>Log out</Button>
  )
}
