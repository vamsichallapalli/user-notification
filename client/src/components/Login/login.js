import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './login.css'
import { io } from "socket.io-client";
const Login = () => {
  const [input, setInput] = useState("")
  const [user, setUser] = useState(null)
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    setSocket(io("http://localhost:5000"));

  }, [])
  return (
    <div className='main-container'>
      {user ?
        <>
          <Card user={user} socket={socket} />
        </>
        : <div className='login-container' >
          <input type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder='Username' />
          <button onClick={() => setUser(input)}>Login</button>
        </div>}

    </div>
  )
}

export default Login