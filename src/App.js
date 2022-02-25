import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import AuthProva from "./pages/Auth";
import Create from "./pages/Create";
import CreateImg from "./pages/CreateImg";
import Nav from "./navigation/Nav";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import Update from "./pages/Update";
import Bootstrap from "./pages/boostrao";

const App = function() {
  return (
    <BrowserRouter>
    <Nav></Nav>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        {/* <Route path='/auth' element={<AuthProva/>}></Route> */}
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/create-img' element={<CreateImg/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/post/:id' element={<Post/>}></Route>
        <Route path='/update' element={<Update/>}></Route>
        <Route path='/bootstrap' element={<Bootstrap/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
