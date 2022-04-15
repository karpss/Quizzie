/* eslint-disable */
import React, { useState, useEffect } from 'react';
import QuestionPage from '../QuestionPage/QuestionPage';
import HomePageProps from '../../interface/homePageProps';
import AnswerProps from '../../interface/answerProps.interface';
import {getQuiz} from '../../http/http';
import {totalSetQuestions, difficultyLevel} from '../../constants/constants';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [questions, setQuestions] = useState<HomePageProps[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  //const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerProps[]>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizList = await getQuiz(
        totalSetQuestions,
        difficultyLevel.HARD

      );
      setQuestions(quizList);
    };

    fetchQuiz();

  },[])

  //console.log(questions);

  const checkTheAnswer = (e: React.FormEvent <HTMLFormElement>): void => {
    e.preventDefault();
    if (gameOver) return;
    // selected answer
    const choosedAnswer = e.currentTarget.innerText;
    // Matching chosen answer with correct answer from the API
    const correct = questions[questionNumber]?.correct_answer === choosedAnswer;
    // score tracking
    if (correct) setScore((previous) => previous + 1);
    // user can change choice
    if (userAnswer.length != questionNumber) {
      if (!correct) setScore((previous) => previous - 1);
      const lastIndex = userAnswer.length - 1;
      if (lastIndex >= 0) {
        userAnswer.splice(lastIndex, 1);
        const answerObject = {
          question: questions[questionNumber]?.question,
          answer: choosedAnswer,
          correct,
          correctAnswer: questions[questionNumber]?.correct_answer,
        };
        setUserAnswer((previous) => [...previous, answerObject]);
      }
      return;

    }
// answer interface
    const answerObject = {
      question: questions[questionNumber]?.question,
      answer: choosedAnswer,
      correct,
      correctAnswer: questions[questionNumber]?.correct_answer,
    };
    // spread the previous answer and add to the answer object to update
    setUserAnswer((previous) => [...previous, answerObject]);
  }

  const startTheQuiz = (): void => {
    setStartQuiz(true);
  }

  const nextQuestion = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const nextQuestion = questionNumber + 1;
    if (totalSetQuestions === nextQuestion) {
      setGameOver(true);
      return;
    }
    setQuestionNumber(nextQuestion);
  }

  const replayTheQuiz = (): void => {
    setStartQuiz(false);
    setGameOver(false);
    setQuestionNumber(0);
    setScore(0);
    setUserAnswer([]);
  }








  return (
        <div className='homepage'>
          {userAnswer.length === questionNumber &&
        !gameOver &&
        
        !startQuiz ? (
        <>
        <h1>Welcome to Quizzie</h1>
        <p className='intro'>
        There are a few questions here for you to answer. Please try to answer them to the best of your ability.

        </p>
        <button className='home-button' onClick={startTheQuiz}>Start Quiz</button>
        </>
        ) : null}
        


        { !gameOver && startQuiz && (
        <>
        <QuestionPage
        questions={questions[questionNumber].question}
        questionNumber={questionNumber}
        totalQuestions={totalSetQuestions}
        callback={checkTheAnswer}
        category={questions[questionNumber].category}
        
        
        />
        <button className='next-button' onClick={nextQuestion}>Next Question</button>
        </>
        )}

        {gameOver && (
          <>
          <h2>Game Over!</h2>
          
          <p>Your score is {score}/{totalSetQuestions}</p>
          
          
          <button className='next-button' onClick={replayTheQuiz}>Replay Quiz</button>
          
          
          
          
          </>






        )}
        </div>

        
  )
  
}

export default HomePage;