import { useEffect } from "react";

const Timer = ({ dispatch, secondsRemainig }) => {
  const mins = Math.floor(secondsRemainig / 60);
  const seconds = secondsRemainig % 60;

  useEffect(() => {
    const timerId = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timerId);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
