import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Edit = () => {
  const [book, setBook] = useState({
    author: "",
    title: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://127.0.0.1:3000/api/books/" + id, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Edit book</h1>
      <div className="form">
        <input type="text" placeholder="author" onChange={handleChange} name="author" />
        <input type="text" placeholder="title" onChange={handleChange} name="title" />
        <button className="btn btn-xl btn-blue" onClick={handleClick}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Edit;
