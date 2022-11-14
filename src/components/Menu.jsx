import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Menu({cat}) {

  const [posts,setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?category=${cat}`);
        setPosts(res.data); 
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [cat]);

  // const posts = [
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
  return (
    <div className='menu'>
        <h1>Drugi članovi koji Vam se mogu svideti</h1>
        {posts.map((post)=>(
            <div className='post' key={post.id}>
                <img src={`../upload/${post.img}`} alt=''/>
                <h2>{post.title}</h2>
                <button>Procitaj vise</button>
                </div>
        ))}
    </div>
  ) 
}

export default Menu