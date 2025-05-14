// components/Result.js
import React from "react";
import { Button, Card, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../../application/quizSlice";


const { Title, Paragraph } = Typography;

const Result = () => {
  const dispatch = useDispatch();
  const { questions, answers } = useSelector((state) => state.quiz);

  const correctAnswers = questions.filter(
    (q, i) => q.correct === answers[i]
  ).length;

  return (
    <div style={{ padding: 30, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 400 }}>
        <Title level={2}>🎉 Quiz Complete!</Title>
        <Paragraph>
          You answered <b>{correctAnswers}</b> out of <b>{questions.length}</b> questions correctly.
        </Paragraph>
        <Button type="primary" onClick={() => dispatch(resetQuiz())}>
          Restart Quiz
        </Button>
      </Card>
    </div>
  );
};

export default Result;
