'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export const GET = async ()=> {

    let cook = cookies().get('user-connect')?.name
    let cookValue = cookies().get('user-connect')?.value

    console.log(cookValue,cook);
    

    let state: any = {isAuth: false,data: {}}
  
    try {
        const {data} = await axios.get(`${process.env.B_HOST}/user`,
        {
          headers: { Authorization: `Bearer ${cookValue}` },
      });
    
      state = {data:data,isAuth: true};
      
    } catch (er:any) {
      console.log(er.response.data,'error');
      
          state = {data:{},isAuth: false};
      }

      return NextResponse.json({data:state})
}