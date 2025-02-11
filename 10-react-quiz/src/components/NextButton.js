const NextButton = ({ dispatch, answer, index, numOfQuestions }) => {
  if (answer === null) return null;
  const lastQuestion = index === numOfQuestions - 1;

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: lastQuestion ? "finish" : "nextQuestion" })}>
      {lastQuestion ? "Finish" : "Next"}
    </button>
  );
};

export default NextButton;
