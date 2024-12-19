import Head from "next/head";
import EyeTracker from "../components/EyeTracker";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Eye Tracking Exam System</title>
        <meta name="description" content="Track user gaze for online exams" />
      </Head>
      <main>
        <EyeTracker />
      </main>
    </div>
  );
}
