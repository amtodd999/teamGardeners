import React, { Component, useState, useEffect } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';

// Store token in the parent component (App.js) so we can pass 
// token as a prop to all of the child components that need it.

// UseState hook to create new state variable - it will start empty, 
// be given a value upon logging in, then emptied upon logout.

// The second argument of useState allows us to change our sessionToken
// state variable.

// We have an effect that runs once upon initial component load.  It updates
// our sessionToken state variable if Chrome has saved a sessionToken in localStorage.  
// Because we pass an empty array as a second argument, there is no change our effect
// is tracking to re-run later, so the effect runs only upon initial component load.

// This function takes in a token and saves it two places--both in our localStorage and
// in our state variable, sessionToken.  The localStorage is a secure place to store this
// data, and will persist as long as out browser is open.  The state variable allows
// child components to quickly access the sessionToken for use.

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
    // console.log(sessionToken)
  }

// Logout function - reset the state of our sessiontoken to an empty
// string and then we clear our token from local storage.  We determine
// if a user is logged in based on whether or not sessionToken exists in
// their local storage.

  const clearToken = () => { 
    localStorage.clear();
    setSessionToken('');
  }

  // const protectedViews = () => {
  //   return (sessionToken === localStorage.getItem('token') ? <NoteIndex token={sessionToken}/>
  //   : <Auth updateToken={updateToken}/>)
  // }

  return (
    <div>
      <Sitebar clickLogout={clearToken}/>
      {/* {protectedViews()} */}
      <Auth updateToken={updateToken} />
    </div>
  );
};

export default App;
