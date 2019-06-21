import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// const { Client } = require('pg')

// const _client = new Client({
//     user: "postgres",
//     port: 5432,
//     host: "ethanspc",
//     database: "Canvas_Painter",
// })

// _client.connect()
// .then(() => console.log("Connected Successfuly"))
// .catch(e => console.error(e))
// .finally(() => _client.end())

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
