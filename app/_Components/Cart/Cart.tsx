import getData from "@/app/Requests/getData";
import React, { Suspense } from "react";
import { MdOutlineMenuBook } from "react-icons/md";

import { Skeleton, Spinner } from "@chakra-ui/react";

import Link from "next/link";

const Cart = async () => {
  // get courses
  const data = await getData("course?paginate&count=10", true);

  return (
    <Link href={'/myCourses'} className="relative">
      {/* <Suspense fallback={<Skeleton h={500}></Skeleton>}>
        <div className="absolute w-4 h-4 rounded-full bg-slate-500 flex justify-center items-center -top-3 -left-2">
          <span className="text-xs">
            {data.status
          ? data.data?.filter((el: any) => el.isEnrolled == true).length : <Spinner size={'xl'} />}
          </span>
        </div>
        <MdOutlineMenuBook className="text-xl" />
      </Suspense> */}
    </Link>
  );
};

export default Cart;
