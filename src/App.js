import './App.css';
import NoteIndex from './notes/NoteIndex';
import Auth from './auth/Auth';
import React, { useEffect, useState } from 'react';

function App() {
  const [sessionToken, setSessionToken] = useState(''); 

  useEffect(() => { 
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    } console.log("this is a test" + localStorage.getItem('token'))
    
  }, [])
  
  const updateToken = (newToken) => { 
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

// Logout function - reset the state of our sessiontoken to an empty
// string and then we clear our token from local storage.  We determine
// if a user is logged in based on whether or not sessionToken exists in
// their local storage.

  const clearToken = () => { 
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    
    return (sessionToken === localStorage.getItem('token') ? <NoteIndex token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
    
  }

  return (
    <div>
      <Sitebar clickLogout={clearToken}/>
{/* protectedViews function above calls the NoteIndex file */}
      {protectedViews()}
      
    </div>
  );
};

export default App;
