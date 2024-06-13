import axiosClient from '../axios-client'
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();

    try {
        const response = await axiosClient.post(
            `/tweets/store`,
            body,
        );

        // Respond with the newly created tweet
        console.log({ tweet: response.data.tweet })
        return NextResponse.json({ tweet: response.data.tweet });
    } catch (error) {
        console.error('Error posting tweet:', error.response?.data || error.message);
        return new NextResponse('Failed to post tweet', { status: 500 });
    }
}

export async function GET(req) {
  // const body = await req.json();
  // console.log

  try {
    const response = await axiosClient.get(
        `/tweets`,
        // {params: 1},
    );

    // Respond with the newly created tweet
    // return response.data;
    // console.log(response.data.data);
    return NextResponse.json({ data: response.data.data });
  } catch (error) {
    console.error('Error getting tweets:', error.response?.data || error.message);
    return new NextResponse('Failed to get tweet', { status: 500 });
  }
}
