"use client";
import React, { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";

import { FaCartPlus } from "react-icons/fa";

import ChakraUi from "@/Providers/ChakraUI";
import buyCourseAction from "@/app/Requests/buyCourse";

const BuyBtn = ({
  courseId,
  price,
  isEnrolled,
}: {
  courseId: string;
  price: string;
  isEnrolled: boolean;
}) => {
  const msg = useToast();

  const [isSubmit, setIsSubmit] = useState(false);

  const buyCourse = async () => {
    if (isEnrolled) {
      msg({ title: "You Are In 👌", status: "success", duration: 3000 });
      return;
    }

    setIsSubmit(true)
    const res = await buyCourseAction(courseId);
    setIsSubmit(true)

    if (res.state == "error") {
      setIsSubmit(false);
      msg({ title: res.message, status: "error", duration: 3000 });
    } else {
      msg({ title: res.message, status: "success", duration: 3000 });
      setIsSubmit(false);
    }
  };

  return (
    <ChakraUi>
      {
        isSubmit ?
        'submit':

      <Button
      onClick={buyCourse}
      className="flex gap-3"
      fontSize={20}
      padding={7}
      leftIcon={<FaCartPlus />}
      colorScheme="teal"
      variant="solid"
      >
        Buy
        <span> ${price}</span>
      </Button>
      }
    </ChakraUi>
  );
};

export default BuyBtn;
// Buy
// <span> ${price}</span>
