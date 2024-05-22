"use client";
import React, { useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { Card, CardHeader } from "@nextui-org/card";

import Transitions from "../Animate/Transitions";

import MyAlet from "../Custom/MyAlet";
import ChakraUi from "@/Providers/ChakraUI";

import sendData from "@/app/Requests/sendData";
import Countdown from "../Custom/CountDown";

interface SingleAnswer {
  id: number;
  answer: string;
  right: number;
  selected?: boolean;
}

interface QuestionType {
  questionText: string;
  id: number;
  answers: SingleAnswer[];
  Quesitons: any;
}

interface Result {
  correct_answers: number;
  total_questions: number
}

const QuestionCard = ({
  q,
  formId,
  time,
}: {
  q: QuestionType[];
  formId: string;
  time: number;
}) => {
  const msg = useToast();

  const [isSend, setIsSend] = useState(false);

  const [questionIndx, setQuestionIndx] = useState(0);

  const [allQuestions, setAllQuestions] = useState<QuestionType[]>(q);

  const [result, setResult] = useState<undefined | Result>(undefined)

  const validFun = (validMsg: string) => {
    // check current question if has a select = true
    let isSelected = allQuestions[questionIndx].answers.filter(
      (ans: SingleAnswer) => ans.selected
    );

    if (isSelected.length == 0) {
      msg({
        title: validMsg,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return false;
    } else {
      return true;
    }
  };

  const handelNextPrev = (t: string) => {
    if (validFun("Select an answer") == false) {
      return;
    }
    if (t == "next") {
      if (questionIndx < q.length - 1) {
        setQuestionIndx((p) => p + 1);
      }
    } else {
      if (questionIndx > 0) {
        setQuestionIndx((p) => p - 1);
      }
    }
  };

  const handleAnswers = (answerId: any, questionId: number) => {
    // msg({ title: "You Are In 👌", status: "success", duration: 3000 });
    const quesWithSelectedKey = allQuestions[questionIndx].answers.map(
      (ans: SingleAnswer) => {
        if (ans.id == answerId) {
          return { ...ans, selected: true };
        } else {
          return { ...ans, selected: undefined };
        }
      }
    );
    const newQ = [...allQuestions].map((el) => {
      if (el.id == questionId) {
        return { ...el, answers: quesWithSelectedKey };
      } else {
        return el;
      }
    });

    setAllQuestions((p) => newQ);
  };

  const submitFunc = async () => {
    // check if all answers is ready to submit
    if (validFun("You have to select an answer") == false) {
      return;
    }

    const collectAnswers = allQuestions.map((question) => {
      let rightAnswer = question.answers.filter((r) => r.selected == true)[0]
        .id;
      return { question_id: question.id, answer_id: rightAnswer };
    });

    const data = {
      form_id: formId,
      answers: collectAnswers,
    };

    setIsSend((p) => !p);
    const resp = await sendData(data);
    setResult(p=> resp.data.data)
    console.log(resp);
    
    msg({ title: "Well Done👌", status: "success", duration: 3000 });
    setIsSend((p) => !p);
  };

  if (allQuestions?.length == 0) {
    return (
      <MyAlet
        msg="Please try again after a while"
        statu="info"
        title="We will show quesitons soon ......"
      />
    );
  }

  return (
    <ChakraUi>
      {
        result == undefined ?
      <div className="question p-4 bg-[#f2f2f2] relative rounded-xl w-full mb-5 ">
        <Countdown initialNumber={time} onFinish={() => {}} />

        <h3 className="lg:text-4xl bold text-md my-9">
          {allQuestions[questionIndx].questionText}
        </h3>
        <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-2 my-4">
          {allQuestions[questionIndx]?.answers?.map(
            (ans: SingleAnswer, indx: number) => (
              <Card
                onClick={() =>
                  handleAnswers(ans.id, allQuestions[questionIndx].id)
                }
                key={ans.id}
                isPressable
                isFooterBlurred
                radius="lg"
                className={`border-none outline-none overflow-hidden rounded-xl bg-[#cfcfcf] p-2`}
              >
                <Transitions marginNum={indx}>
                  <CardHeader>
                    <h3
                      className={`${
                        ans.selected == undefined
                          ? `p-1`
                          : `bg-teal-600 white p-3`
                      } lg:text-3xl border-none outline-none text-md transition-all ease-in-out duration-700 rounded-xl `}
                    >
                      {ans.answer}
                    </h3>
                  </CardHeader>
                </Transitions>
              </Card>
            )
          )}
        </div>

        <div className="flex gap-5 mt-8">
          {questionIndx == 0 ? (
            ""
          ) : (
            <Card
              onPressEnd={() => handelNextPrev("")}
              isPressable
              isFooterBlurred
              radius="lg"
              className={`border-none overflow-hidden`}
            >
              <CardHeader className="text-tiny text-teal-900 rounded-xl bg-black/20">
                <h3 className="lg:text-3xl text-md">Prev</h3>
              </CardHeader>
            </Card>
          )}
          {questionIndx + 1 == allQuestions?.length ? (
            <>
              {isSend ? (
                <Spinner size={"2xl"} />
              ) : (
                <Card
                  onPressEnd={() => submitFunc()}
                  isPressable
                  isFooterBlurred
                  radius="lg"
                  className={`border-none overflow-hidden`}
                >
                  <CardHeader className="text-tiny bg-teal-900 rounded-xl white">
                    <h3 className="lg:text-3xl text-md">Submit</h3>
                  </CardHeader>
                </Card>
              )}
            </>
          ) : (
            <Card
              onPressEnd={() => handelNextPrev("next")}
              isPressable
              isFooterBlurred
              radius="lg"
              className={`border-none overflow-hidden`}
            >
              <CardHeader className="text-tiny text-teal-900 rounded-xl bg-black/20">
                <h3 className="lg:text-3xl text-md">Next</h3>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
      :
      <MyAlet title="Your Scor" msg={`${result.correct_answers} correct from ${result.total_questions} questions`} statu="" />
      }
    </ChakraUi>
  );
};

export default QuestionCard;
