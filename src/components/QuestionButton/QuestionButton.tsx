/* eslint-disable */

import React from 'react';
import QuestionButtonProps from '../../interface/questionButtonProps';

const QuestionButton: React.FC <QuestionButtonProps> = ({value, onClick}) => {
  return (
    <div>

<button onClick={(e)=> onClick(e)}>{value}</button>

    </div>
  )
}

export default QuestionButton;