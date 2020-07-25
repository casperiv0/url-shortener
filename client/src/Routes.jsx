import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Index from './components/Index';
import Slug from './components/Slug';


export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Route path='/' exact component={Index} />
        <Route path="/:slug" component={Slug} />
      </Router>
    );
  }
}
