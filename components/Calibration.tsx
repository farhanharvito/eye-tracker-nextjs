import { useEffect, useState } from "react";

const Calibration: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentPoint, setCurrentPoint] = useState<number>(0);
  const calibrationPoints = [
    { x: "10%", y: "10%" },
    { x: "90%", y: "10%" },
    { x: "50%", y: "50%" },
    { x: "10%", y: "90%" },
    { x: "90%", y: "90%" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPoint < calibrationPoints.length - 1) {
        setCurrentPoint((prev) => prev + 1);
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentPoint, onComplete]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <p style={{ textAlign: "center" }}>Focus on the dot for calibration</p>
      {calibrationPoints.map((point, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: point.x,
            top: point.y,
            width: 20,
            height: 20,
            backgroundColor: index === currentPoint ? "red" : "gray",
            borderRadius: "50%",
            transition: "background-color 0.5s",
          }}
        />
      ))}
    </div>
  );
};

export default Calibration;
