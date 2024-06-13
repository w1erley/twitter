import axiosClient from '../../axios-client'
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  // const body = await req.json();
  const { tweetId } = params;
  // console.log

  try {
    const response = await axiosClient.get(
        `/tweets/${tweetId}`
    );

    // Respond with the newly created tweet
    // return response.data;
    // console.log(response.data.data);
    // console.log(response.data)
    return NextResponse.json({ data: response.data });
  } catch (error) {
    console.error('Error getting tweets:', error.response?.data || error.message);
    return new NextResponse('Failed to get tweet', { status: 500 });
  }
}
