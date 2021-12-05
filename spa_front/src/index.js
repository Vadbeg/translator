
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from "./App";

import './static/style.css';

const history = createBrowserHistory();

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
