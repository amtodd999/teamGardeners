import './App.css';
import {Button} from 'reactstrap';
import NoteIndex from './notes/NoteIndex';
import Auth from './auth/Auth';
import { useEffect, useState } from 'react';

function App() {
const [sessionToken, setSessionToken] = useState('');

useEffect(() => {
  if (localStorage.getItem('token')){
    setSessionToken(localStorage.getItem('token'));
  }
}, [])

const updateToken = (newToken) => {
  localStorage.setItem('token', newToken);
  setSessionToken(newToken);
}

const clearToken = () => {//this will need a Logout button
  localStorage.clear();
  setSessionToken('');
}

const protectedViews = () => {
  return (sessionToken === localStorage.getItem('token') ? <NoteIndex token={sessionToken}/> : <Auth updateToken={updateToken}/>)
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Team Gardeners
        </a>
      </header>
      {/* protectedViews function above calls the NoteIndex file */}
      {protectedViews}
    </div>
  );
}

export default App;
