import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export const GET = async ()=> {

return NextResponse.json({data: 'data'})
}