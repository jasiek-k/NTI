import "./AddPost.css";
import React from "react";
import { addNewPost } from "./../../services/newsService";
import { postRequest } from "../../services/apiService";

const AddPost = () => {
  const handlePostAdding = async () => {
    const postInput = document.getElementById("Post-input").value;
    console.log(postInput);
    if (postInput.length > 0) {
      try {
        await addNewPost(JSON.stringify({ content: postInput, photo: null }));
        document.getElementById("Post-input").value = "";
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="Container">
      <h1 className="Add-post-header">TEST</h1>
      <form>
        <textarea className="Post-input" id="Post-input" type="text"></textarea>
        <div className="Button-wrapper">
          <button onClick={handlePostAdding} className="Add-post-button">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
