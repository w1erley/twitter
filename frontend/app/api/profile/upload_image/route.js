// import axiosClient from "@/app/api/axios-client";
import axiosClient from "../../axios-client";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const formData = await req.formData();
    console.log("formData:", formData)
    const response = await axiosClient.post(
        `/images/upload`,
        formData,
        {
          headers: { 'content-type': 'multipart/form-data' },
          params: {'_method': 'PUT'}
        }
    );

    // Respond with the newly created tweet
    console.log("response data", response.data)
    return NextResponse.json(response.data);
  }
  catch (error) {
    console.error('Error uploading image:', error.response?.data || error.message);
    return new NextResponse('Error uploading image', { status: 500 });
  }
}
