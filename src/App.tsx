import './App.css'
import RegistrationForm from "./components/app/auth.tsx";
import GameRoulette from "./components/app/gameRoulette.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthorInfo from "./components/app/contactAuthor.tsx";
import OtherGames from "./components/app/otherGames.tsx";
import {useState} from "react";
import RadioButton from "./components/htmlItems/radioButton.tsx";
import Dashboard from "./components/refUse/hardTasks.tsx";
import Chat from "./components/refUse/readLastState.tsx";


export default function App() {
  const [mode, setMode] = useState('dark'); // Начальный режим — темный

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <div className={`${mode === 'dark' ? 'dark' : ''}`}> {/* Применяем класс dark или ничего */ }
        <nav className="menu flex justify-between w-full">
          <ul className="flex space-x-4">
            <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a href="/auth">Authenticate</a></li>
            <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a href="/">Account</a></li>
            <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a href="/about">Contacts</a></li>
            <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a href="/games">All Games</a></li>
            <button id="toggleDarkMode" className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick" onClick={toggleMode}>
              {mode === 'dark' ? "🌞 Переключить на светлый режим" : "🌑 Переключить на темный режим"}
            </button>
          </ul>
        </nav>

        <Routes>
          <Route path="/btn" element={<Chat />} />
          <Route path="/auth" element={<RegistrationForm />} />
          <Route path="/about" element={<AuthorInfo />} />
          <Route path="/games" element={<OtherGames />} />
          <Route path="/game-roulette" element={<GameRoulette/>} />
        </Routes>
      </div>
    </Router>
  );
}
