import { useEffect, useState } from "react";
import Script from "next/script";
import CameraSetup from "./CameraSetup";
import Calibration from "./Calibration";

declare global {
  interface Window {
    webgazer: any;
  }
}

const EyeTracker: React.FC = () => {
  const [cameraReady, setCameraReady] = useState(false);
  const [isCalibrated, setIsCalibrated] = useState(false);

  const handleCalibrationComplete = () => {
    setIsCalibrated(true);
    console.log("Calibration complete. Eye tracking is active.");
  };

  useEffect(() => {
    const initializeWebGazer = () => {
      if (window.webgazer) {
        console.log("Initializing WebGazer...");
        window.webgazer
          .setGazeListener((data: any) => {
            if (data) console.log(`Gaze Coordinates: X=${data.x}, Y=${data.y}`);
          })
          .begin()
          .showVideoPreview(true)
          .showPredictionPoints(true);

        const ensureVideoFeedExists = () => {
          const videoPreview = document.getElementById("webgazerVideoFeed");
          if (videoPreview) {
            videoPreview.style.cssText = `
              position: fixed;
              top: 10px;
              right: 10px;
              width: 320px;
              height: 240px;
              border: 2px solid #ccc;
              border-radius: 8px;
              z-index: 9999;
            `;
          } else {
            console.warn("WebGazer video feed not found yet.");
            setTimeout(ensureVideoFeedExists, 500);
          }
        };

        ensureVideoFeedExists();
      }
    };

    if (cameraReady) {
      initializeWebGazer();
    }

    return () => {
      if (window.webgazer) {
        console.log("Cleaning up WebGazer...");
        window.webgazer.end();
        const videoPreview = document.getElementById("webgazerVideoFeed");
        if (videoPreview) {
          videoPreview.remove();
        }
      }
    };
  }, [cameraReady]);

  return (
    <div>
      {!cameraReady ? (
        <CameraSetup onAccessGranted={() => setCameraReady(true)} />
      ) : !isCalibrated ? (
        <Calibration onComplete={handleCalibrationComplete} />
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h1>Eye Tracking Active</h1>
          <p>Your gaze is tracked. Stay focused on the screen.</p>
        </div>
      )}

      <Script
        src="https://cdn.jsdelivr.net/npm/webgazer/dist/webgazer.min.js"
        onLoad={() => console.log("WebGazer loaded successfully")}
      />
    </div>
  );
};

export default EyeTracker;
