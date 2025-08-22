import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    author: "",
    title: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3000/api/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Add new book</h1>
      <div className="form">
        <input type="text" placeholder="author" onChange={handleChange} name="author" />
        <input type="text" placeholder="title" onChange={handleChange} name="title" />
        <button className="btn btn-xl btn-green" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Add;
