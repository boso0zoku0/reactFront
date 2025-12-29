import './App.css'
import RegistrationForm from "./components/app/auth.tsx";
import GameRoulette from "./components/app/gameRoulette.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthorInfo from "./components/app/contactAuthor.tsx";
import {useEffect, useState} from "react";
import RadioButton from "./components/htmlItems/radioButton.tsx";
import Page from "./components/ref/EffectUse/homework.tsx";
import HorizontalRoulette from "./components/roul.jsx";
import RouletteWithAvatars from "./components/tryRoil.jsx";
import RouletteRoll from "./components/roll.jsx";
import RouletteFigmaV2 from "./components/figma/RoulleteFigma.tsx";
import WebSocketChat from "./components/websocket.jsx";

export default function App() {
   const [mode, setMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
      <Router>
        <div className={`${mode === 'dark' ? 'dark' : ''}`}> {/* Применяем класс dark или ничего */}
          <nav className="menu flex justify-between w-full mb-20">
            <ul className="flex space-x-4">
              <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a
                href="/auth">Authenticate</a></li>
              <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a href="/">Account</a></li>
              <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a href="/about">Contacts</a>
              </li>
              <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a href="/game-roulette">Roulette</a>
              </li>
              <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a href="/roll-avatar">Roulette-Avatar</a>
              </li>
              <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a href="/roll">Roulette-Horizontal</a>
              </li>
              <li className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"><a href="/roulette">RouletteFigma</a>
              </li>
              <button id="toggleDarkMode" className="text-sky-200 text-shadow-2xs text-shadow-sky-500 font-thick"
                      onClick={toggleMode}>
                {mode === 'dark' ? "🌞 Переключить на светлый режим" : "🌑 Переключить на темный режим"}
              </button>
            </ul>
          </nav>

          <Routes>
            <Route path="/web" element={<WebSocketChat/>}/>
            <Route path="/roulette" element={<RouletteFigmaV2/>}/>
            <Route path="/roll-roulette" element={<RouletteRoll/>}/>
            <Route path="/roll" element={<HorizontalRoulette/>}/>
            <Route path="/roll-avatar" element={<RouletteWithAvatars/>}/>
            <Route path="/page" element={<Page/>}/>
            <Route path="/btn" element={<RadioButton/>}/>
            <Route path="/auth" element={<RegistrationForm/>}/>
            <Route path="/about" element={<AuthorInfo/>}/>
            <Route path="/game-roulette" element={<GameRoulette/>}/>
          </Routes>
        </div>
      </Router>
  );

}
