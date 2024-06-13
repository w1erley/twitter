// import axiosClient from "@/app/api/axios-client";
import getCurrentUser from "../../actions/getCurrentUser";

import axiosClient from "../../axios-client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id } = await getCurrentUser();
    const body = await req.json();
    console.log("id", id)
    const response = await axiosClient.post(
        `/users/${id}`,
        body,
        {
          params: {'_method': 'PUT'}
        }
    );

    // Respond with the newly created tweet
    console.log(response.data)
    return NextResponse.json(response.data);
  }
  catch (error) {
    console.error('Error updating profile:', error.response?.data || error.message);
    return new NextResponse('Error updating profile', { status: 500 });
  }
}
