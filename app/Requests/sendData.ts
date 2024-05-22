'use server'
import axios from 'axios'
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

interface FormData {
    phone: string;
    password: string;
  }
  
  interface ErrorResponse {
    message: string; // Define the error response structure
  }
  
  const sendData = async (data:any): Promise<any | ErrorResponse> => {
    
  let cookValue = cookies().get("user-connect")?.value;
    try {
      const response = await axios.post(`${process.env.B_HOST}/exam/correct`, data, {
        headers: { Authorization: `Bearer ${cookValue}` },
      } );
      
    //   revalidatePath('/course?paginate&count=10')
      return {data: response.data,state: 'true'};
    } catch (error :any ) {
      const errorMessage = error.response?.data?.message || error.message;
      return { message: errorMessage,state: 'error' ,res: error.response?.data}; // Return a custom error object
    }
  };
export default sendData