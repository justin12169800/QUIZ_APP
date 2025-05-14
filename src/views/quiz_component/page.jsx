import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Space, Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Result from "./result";
import "./page.css";
import { fetchQuestions, selectAnswer,nextQuestion } from "../../application/quizSlice";

const { Title } = Typography;

export default function App() {
  const dispatch = useDispatch();
  const { questions, currentQuestion, answers, status } = useSelector((state) => state.quiz);

  const [timer, setTimer] = useState(30);
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (questions.length === 0 || currentQuestion >= questions.length) return;
    setIsTimerFinished(false);
    setTimer(30);

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(id);
          setIsTimerFinished(true);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch, currentQuestion, questions]);

  useEffect(() => {
    if (isTimerFinished) {
      dispatch(nextQuestion());
      setIsTimerFinished(false);
    }
  }, [isTimerFinished, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load quiz.</p>;
  if (!questions.length) return <p>No questions available.</p>;

  if (currentQuestion >= questions.length) {
    return <Result />;
  }

  const question = questions[currentQuestion];
  const userAnswer = answers[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <Title level={5}>
          Question {currentQuestion + 1} / {questions.length}
        </Title>
        <Title level={2}>
          QUIZ APP
        </Title>
        <Progress
     
          type="circle"
          percent={(timer / 30) * 100}
          format={() => `${timer}s`}
          strokeWidth={8}
          width={60}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          status="active"
        />
      </div>


      <Card className="quiz-card" title={<Title level={4}>{question.question}</Title>}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {question.options.map((opt, i) => (
            <Button
              key={i}
              type={userAnswer === opt ? "primary" : "default"}
              block
              size="large"
              className={`quiz-option ${userAnswer === opt ? "active" : ""}`}
              onClick={() => dispatch(selectAnswer({ index: currentQuestion, answer: opt }))}
            >
              {opt}
            </Button>
          ))}
        </Space>
      </Card>


      <Space style={{ marginTop: 20 }}>
        <Button
          type="primary"
          size="large"
          disabled={userAnswer == null}
          onClick={() => dispatch(nextQuestion())}
        >
          Next
        </Button>
      </Space>
    </div>
  );
}
