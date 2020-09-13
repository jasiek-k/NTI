import "./AddPost.css";
import React from "react";
import { addNewPost } from "./../../services/newsService";

const AddPost = () => {
  const handlePostAdding = async () => {
    try {
      await addNewPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Container">
      <h1 className="Add-post-header">TEST</h1>
      <form>
        <textarea className="Post-input"></textarea>
        <button>ADD</button>
      </form>
    </div>
  );
};

export default AddPost;
