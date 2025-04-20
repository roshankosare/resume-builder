import { Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./pages/home";
import BuilderPage from "./pages/builder";
import ResumePreviewPage from "./pages/resumePreview";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  useLocalStorage();
  return (
    <div className="w-full min-h-screen h-auto flex flex-col flex-1 bg-gradient-to-br from-sky-300 to-white">
      <Header />
      <div className="w-full sm:max-w-[1200px] h-auto px-4 py-4 sm:px-8 sm:py-8 mx-auto transition-all duration-300 ease-in-out">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/builder" element={<BuilderPage />}></Route>
          <Route path="/preview" element={<ResumePreviewPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
