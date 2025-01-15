import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../components/Landing";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
