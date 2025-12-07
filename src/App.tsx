import './App.css'
import RegistrationForm from "./components/app/auth.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Counter from "./components/app/counter.tsx";
import Home from "./components/app/home.tsx";
import AuthorInfo from "./components/app/contactAuthor.tsx";
import OtherGames from "./components/app/otherGames.tsx";


export default function App() {
  return (
    <Router>
      <div>
        <nav className="menu flex justify-between w-full">
          <ul className="flex space-x-4">
            <li className="hover:bg-amber-950"><a href="/auth">Authenticate</a></li>
            <li className="hover:bg-amber-950"><a href="/">Account</a></li>
            <li className="hover:bg-amber-950"><a href="/about">Contacts</a></li>
            <li className="hover:bg-amber-950"><a href="/count">Game</a></li>
            <li className="hover:bg-amber-950"><a href="/games">All Games</a></li>
            <button id="toggleDarkMode">🌞 Переключить режим 🌑</button>
          </ul>
        </nav>

        <Routes>
          <Route path="/auth" element={<RegistrationForm/>}/>
          <Route path="/count" element={<Counter/>}/>
          <Route path="/about" element={<AuthorInfo/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/games" element={<OtherGames/>}/>
        </Routes>
      </div>
    </Router>
  );
}
