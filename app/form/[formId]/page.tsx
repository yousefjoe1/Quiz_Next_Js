import React, { Suspense } from "react";

import QuestionCard from "@/app/_Components/Cards/QuestionCard";
import getData from "@/app/Requests/getData";
import ChakraUi from "@/Providers/ChakraUI";
import { Skeleton } from "@chakra-ui/react";

interface QuestionType {
id: number;
questionText: string;
}

const page = async ({ params }: { params: { formId: string } }) => {
  const { formId } = params;

  const { data, status } = await getData(`form/${formId}`,false);
  
  const {Question,time}: any = data as unknown;

  // console.log(Question,'Quesiton');
  
  return (
    <div className="container min-h-screen mx-auto pt-9 px-3">
      <Suspense fallback={<ChakraUi> <Skeleton h={500}></Skeleton> </ChakraUi>}>
        {status == true ? (
          <QuestionCard q={Question} formId={formId} time={time} />
        ) : (
          'Loading....................'
        )}
      </Suspense>
    </div>
  );
};

export default page;