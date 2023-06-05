import React from "react";
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import {Link} from "react-router-dom";

const LogInPage = () => {
  return (
    <div className="MainContainer">
        <input className="MainInput" type="text" placeholder="Введите логин"></input>
        <div className="VerticalIndent"></div>
        <input className="MainInput" type="password" placeholder="Введите пароль"></input>
        <div className="VerticalIndent"></div>
        <div className="HorizontalContainer">
          <a href="/">
            <button class="Button" href="/">Log In</button>
          </a>
          <div className="HorizontalIndent"></div>
          <a href="/registration">
            <button class="Button" href="/registration">Sing Up</button>
          </a>
        </div>
    </div>
  );
};
  
export default LogInPage;