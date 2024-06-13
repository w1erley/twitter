// import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import axiosClient from "../axios-client";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      username,
      name,
      email,
      password,
      password_confirmation
    } = body;

    if (!username || !name || !email || !password || !password_confirmation) {
      return new NextResponse('Missing info', { status: 400 });
    }

    if (password !== password_confirmation) {
      return new NextResponse('Passwords are different', { status: 400 });
    }

    console.log();

    const response = await axiosClient.post('/signup', {
        username: username,
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
    });

    const user = response.data.user;
    const token = response.data.token;

    if (!user || !token) {
      throw new Error('Invalid credentials');
    }

    return NextResponse.json(user);

  }
  catch (error) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', { status: 500 });
  }
};
