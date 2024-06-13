import axiosClient from '../../../axios-client';
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { username } = params;
    const response = await axiosClient.get(
        `/users/username/${username}`,
    );

    // Respond with the newly created tweet
    console.log(response.data)
    return NextResponse.json(response.data);
  }
  catch (error) {
    console.error('Error fetching user:', error.response?.data || error.message);
    return new NextResponse('Failed to fetch user', { status: 500 });
  }
}
