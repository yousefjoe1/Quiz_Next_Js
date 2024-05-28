import React, { Suspense } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

import Image from "next/image";
import Link from "next/link";

import getData from "../Requests/getData";
import ChakraUi from "@/Providers/ChakraUI";

import { MdOutlineMenuBook } from "react-icons/md";

interface Course {
  id: number;
  name: string;
  img: string;
  price: number;
}

const page = async () => {
  const { data, status,err } = await getData("course",true);
  // console.log(data,'data c');
  
  
  return (
    <div className="container w-full mx-auto p-5">
      <Suspense
        fallback={
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        }
      >
        <div className="flex flex-wrap justify-between w-full gap-4 mt-3">
          {status == true ? (
            [...data].reverse().map((course: Course) => (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="group text-gray-700 hover:text-blue-500 relative z-10 inset-0 hover:border-blue-500 rounded-md overflow-hidden"
              >
                <div className="absolute justify-center text-black items-center group-hover:w-[100%] overflow-hidden transition-all ease-in-out duration-500 flex inset-0 w-[0%] h-full bg-slate-400/60 z-10">
                  <MdOutlineMenuBook className="text-4xl" />
                  <span className="text-3xl">Details</span>
                </div>
                <Card
                  isPressable
                  className="py-4 bg-slate-500 flex-col rounded-xl"
                >
                  <CardBody className="py-2 h-[300px] max-w-[400px] ">
                    <Image
                      alt="Card background"
                      className="object-cover w-full h-full rounded-xl"
                      src={course.img}
                      width={300}
                      height={300}
                    />
                  </CardBody>
                  <CardFooter className="pb-0 pt-2 px-4 flex justify-between white bold text-xl items-start">
                    <h3>{course.name}</h3>
                    <h3>{course.price}$</h3>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <>
              <ChakraUi>
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Relod the page or check the connection
                    <Link
                      href={`/`}
                      className="font-bold text-2xl text-blue-400 "
                    >
                      Back to home
                    </Link>
                  </AlertDescription>
                </Alert>
              </ChakraUi>
            </>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default page;
