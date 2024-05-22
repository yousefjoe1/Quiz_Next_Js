'use server'
import axios from 'axios'
import { cookies } from 'next/headers';

interface FormData {
    phone: string;
    password: string;
  }
  
  interface ErrorResponse {
    message: string; // Define the error response structure
  }
  
  const postData = async (api:string,formData:FormData): Promise<any | ErrorResponse> => {
    try {
      const response = await axios.post(`${process.env.B_HOST}/${api}`, formData );
      
      // cookies().set('stac', response.data.data.token)
      // console.log(response.data.data.token,'user token');
      
      cookies().set('user-connect', response.data.data.token)


      return {data: response.data,state: 'true'};
    } catch (error :any ) {
      const errorMessage = error.response?.data?.message || error.message;
      return { message: errorMessage,state: 'error' ,res: error.response?.data}; // Return a custom error object
    }
  };
export default postData