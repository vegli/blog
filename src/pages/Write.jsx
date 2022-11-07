import React, { useState } from 'react';
// React-quill na 44:00 u klipu
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {
  const[value,setValue]=useState('');

  console.log(value);
  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder='Title' />
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
            <input style={{display:"none"}} type="file" id="file" />
            <label className="file" htmlFor="file">Dodaj sliku</label>
            <div className="buttons">
              <button className="firstButton">Sacuvaj kao skicu</button>
              <button className="secondButton">Azuriraj</button>
            </div>
          </div>
          <div className="item">
            <h1>KATEGORIJA</h1>
            <div className="cat">
            <input type="radio" name="cat" value="art" id="art"/>
            <label htmlFor="art">UMETNOST</label>
            </div>
            <div className="cat">
            <input type="radio" name="cat" value="science" id="science"/>
            <label htmlFor="science">NAUKA</label>
            </div>
            <div className="cat">
            <input type="radio" name="cat" value="technology" id="technology"/>
            <label htmlFor="technology">TEHNOLOGIJA</label>
            </div>
            <div className="cat">
            <input type="radio" name="cat" value="cinema" id="cinema"/>
            <label htmlFor="cinema">BIOSKOP</label>
            </div>
            <div className="cat">
            <input type="radio" name="cat" value="design" id="design"/>
            <label htmlFor="design">DIZAJN</label>
            </div>
            <div className="cat">
            <input type="radio" name="cat" value="food" id="food"/>
            <label htmlFor="food">HRANA</label>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Write