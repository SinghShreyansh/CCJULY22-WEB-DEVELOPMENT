
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Checkout from "./Checkout";
import Login from './Login';
import Addproduct from './Addproduct';
import GetUser from './GetUser';
import { useStateValue } from './StateProvider'
import { useEffect } from "react"



function App() {

  return (
    <Router>
    <div className="app">

      <Header/>


    <Routes>

      <Route path='/login' element={<Login/>}>  </Route>
      <Route path='/getusers' element={<GetUser/>}>  </Route>

      <Route path='/addproduct' element={<Addproduct/>}>  </Route>
      <Route exact path="/" element={<Home/>}   />
      <Route path="/checkout" element={<Checkout/>} />


     </Routes>

    </div>
    </Router>
  );
}

export default App;
