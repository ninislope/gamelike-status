import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './components/App';
import * as serviceWorker from './serviceWorker';
import { Store } from './Store';
import { Firebase } from './Store/Firebase';

const store = new Store();
Firebase.watchLoginUid((uid) => store.loginUid = uid);
store.tryLoad();
// fetch("data.json").then((res) => res.json()).then(obj => store.setJSON(obj));

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
