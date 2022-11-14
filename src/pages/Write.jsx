import React, { useState } from 'react';
// React-quill na 44:00 u klipu
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import moment from "moment"

const Write = () => {

  const state = useLocation().state
  // ako state.titl postoji to ce biti titl a ako ne postoji onda prazan string tj new post page i tako za sve
  const[value,setValue]=useState(state?.desc || '');
  const[title,setTitle]=useState(state?.title || '');
  // file nije string pa ne pisemo nista za state
  const[file,setFile]=useState(null);
  const[cat,setCat]=useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData()
      // iz index.js vidimo da saljemo "file", vidi u app.post(...)
      formData.append("file", file)
      const res = await axios.post("/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }


  const handleClick = async e => {
    e.preventDefault()
    const imgUrl = await upload()

    try {
      // ako state ne postoji onda je nov post
      // ako postoji onda je update
      state 
      ? await axios.put(`/posts/${state.id}`, {
        title,
        desc:value,
        cat,
        img:file ? imgUrl : "",
      }) 
      : await axios.post(`/posts/`, {
        title,
        desc:value,
        cat,
        img:file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      })
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }


  
  return (
    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
        <div className="menu">
          <div className="item">
            <h1>OBJAVI</h1>
            <span>
              <b>Status: </b> draft
            </span>
            <span>
              <b>Vidljivost: </b> public
            </span>
            <input style={{display:"none"}} type="file" id="file"  onChange={e=>setFile(e.target.files[0])}/> 
            <label className="file" htmlFor="file">Dodaj sliku</label>
            <div className="buttons">
              <button className="firstButton">Sacuvaj kao skicu</button>
              <button className="secondButton" onClick={handleClick}>Objavi</button>
            </div>
          </div>
          <div className="item">  
            <h1>KATEGORIJA</h1>
            <div className="cat">
            <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="art">UMETNOST</label>
            </div>
            <div className="cat">
            <input type="radio" checked={cat === "science"} name="cat" value="science" id="science" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="science">NAUKA</label>
            </div>
            <div className="cat">
            <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="technology">TEHNOLOGIJA</label>
            </div>
            <div className="cat">
            <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="cinema">BIOSKOP</label>
            </div>
            <div className="cat">
            <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="design">DIZAJN</label>
            </div>
            <div className="cat">
            <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="food">HRANA</label>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Write