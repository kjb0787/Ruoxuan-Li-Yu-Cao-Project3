import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Favorites from './Components/Favorites';
import Registration from './Components/Registration';
import SignIn from './Components/SignIn';
import CreateJob from './Components/CreateJob';
import Home from './Components/Home';
import JobDetail from './Components/JobDetail';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/job" element={<JobDetail />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/create" element={<CreateJob />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

