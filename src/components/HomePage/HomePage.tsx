/* eslint-disable */
import { useState, useEffect } from 'react';
import QuestionPage from '../QuestionPage/QuestionPage';
import HomePageProps from '../../interface/homePageProps';
import AnswerProps from '../../interface/answerProps.interface';
import {getQuiz} from '../../http/http';
import {totalSetQuestions, difficultyLevel} from '../../constants/constants'
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

  console.log(questions);

  const checkTheAnswer = () => {
    console.log('Answer Checked');
  }

  const startTheQuiz = (): void => {
    setStartQuiz(true);
  }

  const nextQuestion = (): void => {

  }

  const replayTheQuiz = (): void => {
    console.log('replay quiz');
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
        </>
        )}
        </div>

        
  )
  
}

export default HomePage;