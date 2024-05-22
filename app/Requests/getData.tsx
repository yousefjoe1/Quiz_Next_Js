"use server";
import axios from "axios";
import { cookies } from "next/headers";

const getData = async (api: string,paginate:boolean) => {
  let response = { data: [] || {}, status: false , err: '' };

  let cook = cookies().get("user-connect")?.name;
  let cookValue = cookies().get("user-connect")?.value;

  if(!cook){
    response = { data: [] || {}, status: false ,err: ''};
  }

  try {
    const { data } = await axios.get(`${process.env.B_HOST}/${api}`, {
      headers: { Authorization: `Bearer ${cookValue}` },
    });
    if(paginate){
      response = { data: data.data, status: true,err: '' };
    }else {
      response = { data: data.data, status: true  ,err: ''};      
    }
  } catch (er:any) {
    response = { data: [], status: false , err: er };
  }

  return response

};

export default getData;