/* eslint-disable */

import React from 'react';
import QuestionButtonProps from '../../interface/questionButtonProps';
import './QuestionButton.css';

const QuestionButton: React.FC <QuestionButtonProps> = ({value, onClick}) => {
  return (
    <div className='question-button'>

<button onClick={(e)=> onClick(e)}>{value}</button>

    </div>
  )
}

export default QuestionButton;