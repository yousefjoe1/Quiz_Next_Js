"use client";
import React, { useState } from "react";
import { Button, Spinner, useToast } from "@chakra-ui/react";

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
      msg({ title: "You Are In 👌", status: "success", duration: 3000 ,isClosable: true});
      return;
    }

    setIsSubmit(true)
    const res = await buyCourseAction(courseId);
    setIsSubmit(true)

    if (res.state == "error") {
      setIsSubmit(false);
      msg({ title: res.message, status: "error", duration: 3000 ,isClosable: true});
    } else {
      msg({ title: `${res.message} Congratulations`, status: "success", duration: 3000,isClosable: true });
      setIsSubmit(false);
    }
  };

  return (
    <ChakraUi>
      {
        isSubmit ?
        <Spinner size={'2xl'} height={50} width={1} />
        :

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
