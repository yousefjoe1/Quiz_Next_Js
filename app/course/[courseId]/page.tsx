import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardHeader } from "@nextui-org/card";
import { MdOutlineMenuBook } from "react-icons/md";

import BuyBtn from "@/app/_Components/BuyBtn/BuyBtn";

import getData from "@/app/Requests/getData";


interface Forms {
  id: number;
  name: string;
  img: string;
  time: number;
  questionNums: number
}

interface Course {
  img: string;
  name: string;
  price: string;
  isEnrolled: boolean;
  forms: Forms[];
}

const page = async ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params;
  const {data,status} = await getData(`course/${courseId}`, false);
  const courseData: Course = data as unknown as Course;
  const { img, price, name, isEnrolled, forms } = courseData;

  return (
    <div className="course-page min-h-screen p-8 pb-[100px]">
      <div className="img-div lg:h-[50vh] shadow-md border-2 rounded-xl ">
        {status == true ? (
          <Image
            alt="Card background"
            className="object-contain w-full h-full rounded-xl"
            src={img}
            width={300}
            height={300}
          />
        ) : (
          "Loading"
        )}
      </div>

      <div className="name-buybtn flex justify-between my-9 items-start text-2xl w-full">
        <h3 className="bg-slate-300 p-3 rounded-lg">{name}</h3>
        {forms == null ? (
          ""
        ) : (
          <BuyBtn courseId={courseId} price={price} isEnrolled={isEnrolled} />
        )}
      </div>

      {/* Forms */}
      <div className="overflow-hidden flex gap-8 flex-wrap items-center">
        {forms?.length > 0 ? (
          forms?.map((form: Forms) => (
            <div
              key={form.id}
              className="group relative w-fit bg-slate-300 shadow-xl hover:bg-blue-600 hover:text-white overflow-hidden rounded-xl"
            >
              <Card
                isPressable
                key={form.id}
                isFooterBlurred
                radius="lg"
                className="border-none overflow-hidden w-[300px] h-[350px]"
              >
                <Image
                  alt="Woman listing to music"
                  className="object-cover w-full h-full"
                  height={200}
                  src={img}
                  width={200}
                />
                <CardHeader className="pb-0 text-black pt-2 p-4 flex justify-between">
                  <h4 className="font-bold group-hover:text-white text-large">
                    {form.name}
                  </h4>
                  <h4 className="group-hover:text-white text-large">
                    {form.questionNums} <small className="text-slate-400 shadow-lg p-1 rounded-xl">Questions</small>
                  </h4>
                </CardHeader>
                <div className="check_payment z-20 h-full absolute bottom-0 left-0 w-full hidden group-hover:flex justify-center items-center">
                  {isEnrolled ? (
                    <Link
                      href={`/form/${form.id}`}
                      className="h-full w-full flex justify-center white center bg-slate-400/70"
                    >
                      <MdOutlineMenuBook className="text-4xl" />
                      <span className="text-3xl">Details</span>
                    </Link>
                  ) : (
                    <div className="bg-gray-700 w-full p-4 flex-1 white">
                      Buy The Course First ☝️☝️
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))
        ) : (
          'No Forms Yet .......'
        )}
      </div>
    </div>
  );
};

export default page;
