// import axiosClient from "@/app/api/axios-client";
import axiosClient from "../../../axios-client";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const body = await req.json();
    const { tweetId } = params;
    const response = await axiosClient.post(
        `/tweets/${tweetId}/comments`,
        body
    );

    // Respond with the newly created tweet
    console.log(response.data)
    return NextResponse.json(response.data);
  }
  catch (error) {
    console.error('Error posting comment:', error.response?.data || error.message);
    return new NextResponse('Error posting comment', { status: 500 });
  }
}
