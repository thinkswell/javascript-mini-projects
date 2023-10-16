import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { SC2MS, TIMER } from "../config";

const CountdownTimer = ({ remainingTime, setRemainingTime }) => {
  const decrementTime = useCallback(() => {
    setRemainingTime(remainingTime - 1);
  }, [remainingTime, setRemainingTime]);

  useEffect(() => {
    const interval = setInterval(decrementTime, SC2MS);

    return () => {
      clearInterval(interval);
    };
  }, [decrementTime]);

  useEffect(() => {
    if (remainingTime === 0) {
      setRemainingTime(TIMER);
    }
  }, [remainingTime, setRemainingTime]);

  return (
    <div>
      <strong style={{ color: "red" }}>
        {remainingTime} seconds remaining
      </strong>
    </div>
  );
};

CountdownTimer.defaultProps = {
  remainingTime: TIMER,
};

CountdownTimer.propTypes = {
  remainingTime: PropTypes.number,
  setRemainingTime: PropTypes.func,
};

export default CountdownTimer;
