import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Catalog from './Catalog';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import ListRecordComponent from './forum/components/ListRecordComponent';
import ListTopicComponent from './forum/components/ListTopicComponent';
import UpdateRecordComponent from './forum/components/UpdateRecordComponent';
import CreateTopicComponent from './forum/components/CreateTopicComponent';
import CreateRecordComponent from './forum/components/CreateRecordComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LogInPage from './auth/components/LogInPage';
import RegistrationPage from './auth/components/RegistrationPage'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Catalog}></Route>
        <Route path="/forum" exact component={ListTopicComponent}></Route>
        <Route path="/topics" exact component={ListTopicComponent}></Route>
        <Route path="/topics:id" exact component={ListRecordComponent}></Route>
        <Route path="/topics/:id" exact component={ListTopicComponent}></Route>
        <Route path="/add-topic/:id" component={CreateTopicComponent}></Route>
        <Route path="/add-record/:id" component={UpdateRecordComponent}></Route>
        <Route path="/topics:id/add_record" component={CreateRecordComponent}></Route>
        <Route path="/login" component={LogInPage}></Route> 
        <Route path="/registration" component={RegistrationPage}></Route> 
      </Switch>
    </Router>
  </React.StrictMode>
);
function Header() {
  return (
    <div className='header-nav'>
      <a href='/' className='logo'>lapka</a>
      <a href='/' className='header-nav'>Каталог</a>
      <a href='/forum' className='header-nav'>Форум</a>
      <a href='/' className='header-nav'>Корзина</a>
      <a href='/registration' className='header-nav'>Регистрация</a>
    </div>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
