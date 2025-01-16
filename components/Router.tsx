import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../components/Landing";
import AllTools from "./AllTools";
import Resize from "../../components/tools/Resize";
import { Toaster } from "react-hot-toast";

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/all-tools" element={<AllTools />} />
          <Route path="/tool/image-resizer" element={<Resize />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}
