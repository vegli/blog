import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';


const Single = () => {
  return (
    <div className='single'>
      <div className="content">
      <img src="https://www.storynory.com/wp-content/uploads/2022/05/cat-portrait-coverart-1200x1200.jpg" alt=""/>
      <div className="user">
        <img src="https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png" alt=''/>
        <div className="info">
          <span>John</span>
          <p>Posted 2 days ago</p>
        </div>
        <div className="edit">
          <Link to={`/write?edit=2`}>
          <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-editor-pen-pencil-write-icon--4.png" alt=""/>
          </Link>
          <img src="https://cdn-icons-png.flaticon.com/512/1799/1799391.png" alt=""/>
        </div>
      </div>
      <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit!</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, cum. Pariatur quam qui quaerat, perspiciatis dolorum, voluptas officiis odio accusamus sapiente cum, ullam veniam minima doloribus provident nam. Quaerat, dolore?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis temporibus in molestiae dolores iure et explicabo sed magni impedit porro ipsum fugit expedita sunt distinctio nulla mollitia quisquam, recusandae ratione?</p> 
     </div>
      <Menu/>
    </div>
  )
}

export default Single