import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContext } from "./authContext";

const AppWrapper = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("login")) === true) setLogin(true);
    return () => {};
  }, []);

  return (
    <React.StrictMode>
      <AuthContext.Provider value={{ login, setLogin }}>
        <App/>
      </AuthContext.Provider>
    </React.StrictMode>
  );
};

window.addEventListener('error', function (event) {
  if (event.message.includes('SyntaxError')) {
    console.error('Caught an error:', event.error);
    event.preventDefault();
  }
});


ReactDOM.render(<AppWrapper />, document.getElementById("root"));
reportWebVitals();