import './App.css'
import RegistrationForm from "./components/auth.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Counter from "./components/counter.tsx";
import Home from "./components/home.tsx";

// function App() {
//
//   return (
//     <RegistrationForm/>
//   )
// }


function App() {
  return (
    <Router>
      <div>
        <h1>Website</h1>

        <Routes>
          <Route path="/auth" element={<RegistrationForm/>}/>
          <Route path="/count" element={<Counter/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}


export default App
