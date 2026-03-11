import { Navigate, useParams } from "react-router-dom";
import ReadingTestFormPage from "../components/ReadingTestFormPage";
import { readingPartTests } from "../data/readingParts";

export default function ReadingPartPage() {
  const { partId } = useParams();
  const test = readingPartTests[partId];

  if (!test) {
    return <Navigate to="/reading-parts" replace />;
  }

  return (
    <ReadingTestFormPage
      test={test}
      backTo="/reading-parts"
      backLabel="Reading by Part"
      enableQuestionShuffle
    />
  );
}
