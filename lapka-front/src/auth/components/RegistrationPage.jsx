import React, { Component } from "react";
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import UserService from '../services/UserService';

class RegistrationPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      number: '',
    };
    this.createUser = this.createUser.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeNumberHandler = this.changeNumberHandler.bind(this);
  }
  
  createUser(e){
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      number: this.state.number,
    };
    UserService.createUser(user)
  }

  changeNameHandler(event) {
    this.setState({ name: event.target.value });
  }

  changeEmailHandler(event) {
    this.setState({ email: event.target.value });
  }

  changePasswordHandler(event) {
    this.setState({ password: event.target.value });
  }

  changeNumberHandler(event) {
    this.setState({ number: event.target.value });
  }

  render(){
    return (
      <div className="MainContainer">
        <input className="MainInput" type="text" name="email" placeholder="Введите email" onChange={this.changeEmailHandler}></input>
        <div className="VerticalIndent"></div>
        <input className="MainInput" type="password" name="password" placeholder="Введите пароль" onChange={this.changePasswordHandler}></input>
        <div className="VerticalIndent"></div>
        <input className="MainInput" type="text" name="name" placeholder="Введите имя" onChange={this.changeNameHandler}></input>
        <div className="VerticalIndent"></div>
        <input className="MainInput" type="text" name="number" placeholder="Введите телефон" onChange={this.changeNumberHandler}></input>
        <div className="VerticalIndent"></div>
        <button class="Button" onClick={this.createUser} positive>Sign Up</button>
      </div>
    );
  }
};


export default RegistrationPage;