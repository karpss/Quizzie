/* eslint-disable */
import QuestionPageProps from '../../interface/questionPageProps';
import QuestionButton from '../QuestionButton/QuestionButton';
import './QuestionPage.css';

const QuestionPage: React.FC<QuestionPageProps> = ({questions, questionNumber, totalQuestions, callback, category}) => {
  return (
    <div className="question-page">
         <div className='progress'>
          Current Stage: {questionNumber}/{totalQuestions}
          </div>

          <div className='category'>
              {category}
          </div>

          <div className='questions'>
            {questions}

          </div>

          <div>
          <QuestionButton
          value='True'
          onClick={callback}
          />
        </div>

          <div>
          <QuestionButton
          value='False'
          onClick={callback}
          />
        </div>
        
        
    </div>
  )
}

export default QuestionPage;