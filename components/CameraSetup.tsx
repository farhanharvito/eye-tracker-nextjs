import { useEffect, useState } from "react";

interface CameraSetupProps {
  onAccessGranted: () => void;
}

const CameraSetup: React.FC<CameraSetupProps> = ({ onAccessGranted }) => {
  const [error, setError] = useState<string | null>(null);

  const requestCameraAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      onAccessGranted();
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera access denied. Please enable it.");
    }
  };

  useEffect(() => {
    requestCameraAccess();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to the Eye Tracking App</h2>
      <p>We need access to your camera</p>
      {error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      ) : (
        <p>Requesting camera access...</p>
      )}
    </div>
  );
};

export default CameraSetup;
