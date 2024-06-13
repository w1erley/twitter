// import axiosClient from "@/app/api/axios-client";
import axiosClient from "../../../axios-client";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { tweetId } = params;
    console.log(tweetId);
    const response = await axiosClient.post(
        `/tweets/${tweetId}/like`,
    );

    // Respond with the newly created tweet
    console.log(response.data)
    return NextResponse.json(response.data);
  }
  catch (error) {
    console.error('Error posting tweet:', error.response?.data || error.message);
    return new NextResponse('Failed to post tweet', { status: 500 });
  }
}
