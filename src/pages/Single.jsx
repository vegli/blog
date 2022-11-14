import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from "axios"
import moment from "moment"
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import DOMPurify from "dompurify"


const Single = () => {

  const [post,setPost] = useState({})

  const location = useLocation()
  const navigate = useNavigate()

  const postId = location.pathname.split("/")[2] // secka ceo URL na 3 po ovim kosim crtama, uzimamo treci iseckami element a to je ovaj broj ili ti ID

  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data); 
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='single'>
      <div className="content">
      <img src={`../upload/${post?.img}`} alt=""/>
      <div className="user">
        {post.userImg && <img src={post.userImg} alt=''/>} 
        <div className="info">
          <span>{post.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>
        {currentUser.username === post.username &&
          (<div className="edit">
          <Link to={`/write?edit=2`} state={post}>
          <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-editor-pen-pencil-write-icon--4.png" alt=""/>
          </Link>
          <img onClick={handleDelete} src="https://cdn-icons-png.flaticon.com/512/1799/1799391.png" alt=""/>
        </div>)}
      </div>
      <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
     </div>
      <Menu cat = {post.cat}/>
    </div>
  )
}

export default Single