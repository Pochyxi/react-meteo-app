import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PrevisioneLive from "./components/PrevisioneLive";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

function App() {
  const [transformToggle, setTransformToggle] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setTransformToggle(false);
    }, 2800);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <header className="App-header">
                <div className="p-div-imgs">
                  <img
                    src={logo}
                    className="App-logo"
                    id={transformToggle ? "growApp" : ""}
                    alt="logo"
                  />
                  <FaSun
                    id={transformToggle ? "growSun" : ""}
                    className="p-sun"
                  />
                </div>
                <PrevisioneLive batch="hey" />
              </header>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
