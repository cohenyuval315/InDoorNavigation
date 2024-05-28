import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";

const RouteTimer = ({ duration, onStart, onTimeEnd,onTick }) => {
  const [time, setTime] = useState(duration);
  const [started,setStarted] = useState(false);
  const timerRef = useRef(null);
  const tickRef = useRef(null);

  useEffect(() => {
    if (duration !== null) {
      setTime(duration);
      onStart(); // Notify parent that timer has started
      setStarted(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerRef.current);
            setStarted(false);
            onTimeEnd(); // Notify parent that timer has ended
            return 0;
          }
          onTick(new Date())
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [duration, onStart, onTimeEnd]);

  useEffect(() => {
    if (started) {
      tickRef.current = setInterval(() => {
          onTick(new Date())
          if (time <= 1){
            clearInterval(tickRef.current);
          }
      }, 100);
    }
    return () => clearInterval(tickRef.current);
  }, [started]);

  return (
    <Text style={{
      backgroundColor:"black",
      textAlign:"center",
      fontSize:30
    }}>{formatTime(time)}</Text>
  );
};
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default RouteTimer