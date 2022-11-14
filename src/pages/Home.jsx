import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios"

const Home = () => {

  const [posts,setPosts] = useState([])

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data); 
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [cat]);


//const posts = [
//   {
//     id:1,
//     title:"Title 1",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto mollitia tenetur deserunt velit aliquam temporibus praesentium iste earum recusandae, assumenda, dolorum, excepturi sint facere sunt impedit esse maxime in eius.",
//     img:"https://mobirise.com/bootstrap-4-theme/web-application-template/assets/images/cat-as-a-user-3-1200x1200.jpg"
//   },
//   {
//     id:2,
//     title:"Title 2",
//     desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto mollitia tenetur deserunt velit aliquam temporibus praesentium iste earum recusandae, assumenda, dolorum, excepturi sint facere sunt impedit esse maxime in eius.",
//     img:"https://mobirise.com/bootstrap-4-theme/corporate-template/assets/images/cat-as-a-user-1200x1200.jpg"
//   },
//   {
//     id:3,
//     title:"Title 3",
//     desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto mollitia tenetur deserunt velit aliquam temporibus praesentium iste earum recusandae, assumenda, dolorum, excepturi sint facere sunt impedit esse maxime in eius.",
//     img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsUMjPWJM2TXEK6Djy50MhsT42SopKYfWU-Q&usqp=CAU"
//   },
//   {
//     id:4,
//     title:"Title 4",
//     desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto mollitia tenetur deserunt velit aliquam temporibus praesentium iste earum recusandae, assumenda, dolorum, excepturi sint facere sunt impedit esse maxime in eius.",
//     img:"https://image.sciencenordic.com/1451576.jpg?imageId=1451576&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=1200"
//   },
// ];


// Da bi otklonili <p> tagove ovo radimo, malo je bezbednije ovako kaze
const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.body.textContent
}

return (
  <div className='home'>
    <div className="posts">
      {posts.map((post)=>(
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`../upload/${post.img}`} alt="" />
          </div>
          <div className="content">
            <Link className='link' to={`/post/${post.id}`}>
            <h1>{post.title}</h1>
            </Link>
              <p>{getText(post.desc)}</p>
              <button>Read more</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}

export default Home