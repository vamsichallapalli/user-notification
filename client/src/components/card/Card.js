import React, { useEffect, useState } from 'react'
import "./card.css"
import Navbar from '../Navbar/Navbar'
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { GrShare } from "react-icons/gr";
import { GrCircleInformation } from "react-icons/gr";


const posts = [
  {
    id: 1,
    username: "vamsi",
    fullname: "vamsi",
    userImg: "https://res.cloudinary.com/dlzcgycpi/image/upload/v1671599910/IMG_20221208_214306_wo3d8e.jpg",
    postImg: "https://res.cloudinary.com/dlzcgycpi/image/upload/v1671599878/IMG_20221208_215925_sbwhcu.jpg",
  },
  {
    id: 2,
    username: "monica",
    fullname: "Monica Stan",
    userImg: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    postImg: "https://images.pexels.com/photos/3497624/pexels-photo-3497624.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: 3,
    username: "john",
    fullname: "John Keller",
    userImg: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    postImg: "https://images.pexels.com/photos/9730025/pexels-photo-9730025.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  }
];
const Card = ({ user, socket }) => {

  const [idh, setId] = useState([])
  const onHeart = (id, message, recievername) => {
    setId((prev) => [...prev, id])
    socket.emit("sendNotifcation", message, recievername, user)

  }
  useEffect(() => {
    socket.emit("userDetails", user)
  }, [socket, user])

  return (
    <div className='card-container'>
      <Navbar user={user} socket={socket} />
      {posts?.map(post => {
        return (
          <div key={post.id} className="card-container">
            <div className="userInfo">
              <img className="user-image" src={post.userImg} alt="user" />
              <span>{post.username}</span>
            </div>
            <img className="upload-image" src={post.postImg} alt="upload" />
            <div className='user-opinion'>
              <div>
                {idh.includes(post.id) ? <img style={{ marginLeft: "10px" }} src='https://res.cloudinary.com/dlzcgycpi/image/upload/v1671600830/6-63034_transparent-red-heart-icon-png-love-heart-png_o06dbg.png' className='heart' /> : <BsHeart style={{ marginLeft: "10px" }} className='comment-icon' onClick={() => onHeart(post.id, "like", post.username)} />}
                <FaRegComment className='comment-icon' onClick={() => onHeart(null, "comment", post.username)} />
                <GrShare className='comment-icon' onClick={() => onHeart(null, "share", post.username)} />
              </div>
              <div>
                <GrCircleInformation className='comment-icon' />
              </div>
            </div>
          </div>

        )
      })}
    </div>
  )
}

export default Card