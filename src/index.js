// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import {createRoot} from "react-dom/client";

createRoot(
    document.getElementById("root"),).render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
