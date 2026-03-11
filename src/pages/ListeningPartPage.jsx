import { Navigate, useParams } from "react-router-dom";
import ListeningTestFormPage from "../components/ListeningTestFormPage";
import { listeningPartTests } from "../data/listeningParts";

export default function ListeningPartPage() {
  const { partId } = useParams();
  const test = listeningPartTests[partId];

  if (!test) {
    return <Navigate to="/listening-parts" replace />;
  }

  return (
    <ListeningTestFormPage
      test={test}
      backTo="/listening-parts"
      backLabel="Listening by Part"
    />
  );
}
