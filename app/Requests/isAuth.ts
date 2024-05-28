import axios from "axios";

import { cookies } from 'next/headers';


export const isAuth = async () => {
    'use server'

    let isTrue = false;
    let cook = cookies().get('user-connect')?.name
    let cookValue = cookies().get('user-connect')?.value

    // console.log(cook);
    

    if (!cook) {
        isTrue = false;
    }else{
        await axios.get(`${process.env.B_HOST}/user`,
        {
            headers: { Authorization: `Bearer ${cookValue}` },
        }
    ).then(res => {
        // console.log(res);
        
        isTrue = true;
        return false;
    }).catch(er => {
        // console.log(er);

        isTrue = true;
        return false;
    });
    }



    return {
        isTrue
    }
}
    //                 phone: '0105425446',
    //                 password: '12345678',
    //                 guard: "admin",