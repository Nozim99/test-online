import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Search from "./pages/Search.jsx";
import CreateTest from "./pages/CreateTest.jsx";
import Test from "./pages/Test.jsx";
import CreateTestManually from "./pages/CreateTestManually.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Group from "./pages/Group.jsx";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="dark:bg-[#0F172A] bg-neutral-100">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/test/:name" element={<Test/>}/>
        <Route path="/search" element={<Search/>}/>
        {/* <Route path="/create/test" element={<CreateTest/>}/> */}
        {/* <Route path="/create/test/manually" element={<CreateTestManually/>}/> */}
        <Route path="/create/test" element={<CreateTestManually/>}/>
        <Route path="/group/:group" element={<Group/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
