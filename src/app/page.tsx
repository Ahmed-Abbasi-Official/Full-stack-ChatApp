'use client'
import { useSocket } from '@/context/SocketProvider'
import classes from './page.module.css'
import { useState } from 'react';
export default function(){
  const {sendMessage} = useSocket();
  const [message, setMessage] = useState("");
  return(
    <div>
      <div>
        <h1>All Message will appear here...</h1>
      </div>
      <div>
        <form onSubmit={(e)=>{
          e.preventDefault();
          sendMessage(message)
        }}>
          <input 
          type="text"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Message..."
          className={classes["chat-input"]}
           />
           <button className={classes["button"]} type="submit">send</button>
        </form>
      </div>
    </div>
  )
}