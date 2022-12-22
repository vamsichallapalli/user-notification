import React, { useEffect, useState } from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import './navbar.css'
const Navbar = ({ user, socket }) => {
     const [notification, setnotification] = useState([])
     const [open, setOpen] = useState(false)
     useEffect(() => {
          socket.on("getNotification", (data) => {
               setnotification((prev) => [...prev, data])
          })
     }, [socket])

     const dispalyNotification = ({ user, message }) => {
          switch (message) {
               case "like":
                    return <span>{`${user} ${message} your post`}<br /></span>
                    break;
               case "comment":
                    return <span>{`${user} ${message} your post`}<br /></span>
                    break;
               case "share":
                    return <span>{`${user} ${message} your post`}<br /></span>
                    break;
               default:
                    break;
          }
     }
     const handleRead = () => {
          setnotification([])
          setOpen(false)
     }
     return (
          <div className='navbar-container'>
               <span className='logo'>social media</span>
               <div className='icons'>
                    <div className='icon'>
                         <IoIosNotificationsOutline className='react-icon' onClick={() => setOpen(!open)} />
                         {notification.length > 0 && <p className='notification-count'>{notification.length}</p>}
                    </div>
                    <div className='icon'>
                         <TfiEmail className='react-icon' />

                    </div>
                    <div className='icon'>
                         <IoSettingsOutline className='react-icon' />

                    </div>
                    <span style={{ fontSize: "20px" }}>{user}</span>
               </div>
               {open && <div className='notification'>
                    {notification.map(n => dispalyNotification(n))}
                    <button className='read-button' onClick={handleRead}>Mark as Read</button>
               </div>}

          </div>
     )
}

export default Navbar