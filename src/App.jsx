import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListeningPage from "./pages/ListeningPage";
import ListeningPartPage from "./pages/ListeningPartPage";
import ListeningPartsPage from "./pages/ListeningPartsPage";
import ReadingPage from "./pages/ReadingPage";
import ReadingPartPage from "./pages/ReadingPartPage";
import ReadingPartsPage from "./pages/ReadingPartsPage";
import ReadingTest1Page from "./pages/ReadingTest1Page";
import ReadingTest2Page from "./pages/ReadingTest2Page";
import ReadingTest3Page from "./pages/ReadingTest3Page";
import ReadingTest4Page from "./pages/ReadingTest4Page";
import ReadingTest5Page from "./pages/ReadingTest5Page";
import ReadingTest6Page from "./pages/ReadingTest6Page";
import ReadingTest7Page from "./pages/ReadingTest7Page";
import ReadingTest8Page from "./pages/ReadingTest8Page";
import ReadingTest9Page from "./pages/ReadingTest9Page";
import ReadingTest10Page from "./pages/ReadingTest10Page";
import ReadingTest11Page from "./pages/ReadingTest11Page";
import ReadingTest12Page from "./pages/ReadingTest12Page";
import ReadingTest13Page from "./pages/ReadingTest13Page";
import ListeningTest1Page from "./pages/ListeningTest1Page";
import ListeningTest2Page from "./pages/ListeningTest2Page";
import ListeningTest3Page from "./pages/ListeningTest3Page";
import ListeningTest4Page from "./pages/ListeningTest4Page";
import ListeningTest5Page from "./pages/ListeningTest5Page";
import ListeningTest6Page from "./pages/ListeningTest6Page";
import ListeningTest7Page from "./pages/ListeningTest7Page";
import ListeningTest8Page from "./pages/ListeningTest8Page";
import ListeningTest9Page from "./pages/ListeningTest9Page";
import ListeningTest10Page from "./pages/ListeningTest10Page";
import ListeningTest11Page from "./pages/ListeningTest11Page";
import ListeningTest12Page from "./pages/ListeningTest12Page";
import ListeningTest13Page from "./pages/ListeningTest13Page";
import ListeningTest14Page from "./pages/ListeningTest14Page";
import ListeningTest15Page from "./pages/ListeningTest15Page";
import ListeningTestPage from "./pages/ListeningTestPage";
import ListeningTestPlaceholderPage from "./pages/ListeningTestPlaceholderPage";
import ReadingTestPlaceholderPage from "./pages/ReadingTestPlaceholderPage";
import SkillPlaceholderPage from "./pages/SkillPlaceholderPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/listening" element={<ListeningPage />} />
      <Route path="/listening-parts" element={<ListeningPartsPage />} />
      <Route path="/listening-parts/:partId" element={<ListeningPartPage />} />
      <Route path="/listening/test-1" element={<ListeningTest1Page />} />
      <Route path="/listening/test-2" element={<ListeningTest2Page />} />
      <Route path="/listening/test-3" element={<ListeningTest3Page />} />
      <Route path="/listening/test-4" element={<ListeningTest4Page />} />
      <Route path="/listening/test-5" element={<ListeningTest5Page />} />
      <Route path="/listening/test-6" element={<ListeningTest6Page />} />
      <Route path="/listening/test-7" element={<ListeningTest7Page />} />
      <Route path="/listening/test-8" element={<ListeningTest8Page />} />
      <Route path="/listening/test-9" element={<ListeningTest9Page />} />
      <Route path="/listening/test-10" element={<ListeningTest10Page />} />
      <Route path="/listening/test-11" element={<ListeningTest11Page />} />
      <Route path="/listening/test-12" element={<ListeningTest12Page />} />
      <Route path="/listening/test-13" element={<ListeningTest13Page />} />
      <Route path="/listening/test-14" element={<ListeningTest14Page />} />
      <Route path="/listening/test-15" element={<ListeningTest15Page />} />
      <Route path="/listening/:testId" element={<ListeningTestPlaceholderPage />} />
      <Route path="/listening1-13" element={<ListeningTestPage />} />
      <Route path="/reading" element={<ReadingPage />} />
      <Route path="/reading-parts" element={<ReadingPartsPage />} />
      <Route path="/reading-parts/:partId" element={<ReadingPartPage />} />
      <Route path="/reading/test-1" element={<ReadingTest1Page />} />
      <Route path="/reading/test-2" element={<ReadingTest2Page />} />
      <Route path="/reading/test-3" element={<ReadingTest3Page />} />
      <Route path="/reading/test-4" element={<ReadingTest4Page />} />
      <Route path="/reading/test-5" element={<ReadingTest5Page />} />
      <Route path="/reading/test-6" element={<ReadingTest6Page />} />
      <Route path="/reading/test-7" element={<ReadingTest7Page />} />
      <Route path="/reading/test-8" element={<ReadingTest8Page />} />
      <Route path="/reading/test-9" element={<ReadingTest9Page />} />
      <Route path="/reading/test-10" element={<ReadingTest10Page />} />
      <Route path="/reading/test-11" element={<ReadingTest11Page />} />
      <Route path="/reading/test-12" element={<ReadingTest12Page />} />
      <Route path="/reading/test-13" element={<ReadingTest13Page />} />
      {[14, 15].map((testNumber) => (
        <Route
          key={`reading-test-${testNumber}`}
          path={`/reading/test-${testNumber}`}
          element={<ReadingTestPlaceholderPage />}
        />
      ))}
      <Route path="/reading/:testId" element={<ReadingTestPlaceholderPage />} />
      <Route path="/writing" element={<SkillPlaceholderPage title="Writing" />} />
      <Route path="/speaking" element={<SkillPlaceholderPage title="Speaking" />} />
      <Route
        path="/grammar-vocabulary"
        element={<SkillPlaceholderPage title="Grammar & Vocabulary" />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
