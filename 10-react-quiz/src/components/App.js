import { useReducer, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active' };
    case 'newAnswer':
      console.log(action.payload);
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : 0,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return { ...state, status: 'finished' };
    default:
      throw new Error('Unknown action: ' + action.type);
  }
};

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions?.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/questions');
        const data = await response.json();

        dispatch({ type: 'dataReceived', payload: data });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    }
    fetchData();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
          </>
        )}
        {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} />}
      </Main>
    </div>
  );
}

// nastavi od Finishing the Quiz - 11:00
