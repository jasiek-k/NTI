import React from 'react'
import './../styles/subpageTheme.css'
import { PostLogo, PersonIcon } from './../utils/icons'


export default class NewsPost extends React.Component {  
    ifCommentsDisplayed = false
    postId = 0

    displayComments = () => {
        this.ifCommentsDisplayed = this.ifCommentsDisplayed ? false : true
        this.forceUpdate()
    }

    handleCommentSubmit = e => {
        e.preventDefault()
        const commentData = {
            post_id: this.postId, 
            comment: `${document.getElementById("Comment-input").value}`
        }
        this.props.addComment(commentData)
        document.getElementById("Comment-input").value = ""
    }

    render() { 
        let imagesDir = ""
        let postPic = ""
        const { postContent } = this.props.newsPostContent 
        var {comments, content, date, id, photo, tags} = this.props.content
        const [ showCaption, hideCaption, buttonCaption, placeholderCaption ] = postContent
        this.postId = id

        if (photo !== "null") {
            imagesDir = require.context("./../utils/img", false)
            postPic = imagesDir(photo)
        }  

        return (
            <div className="Post-container">
                <div className="Post-header">
                    <PostLogo />
                    <p className="Post-date">{date}</p>
                    <p className="Post-tags-container">{tags.map((item, index) => {
                        return <span className="Post-tag" key={index}>{`#${item}`}</span>
                    })}</p>
                </div>
                <div className="Post-content">
                    <p className="Post-paragraph">{content}</p>
                    {photo === "null" ? (
                    <React.Fragment></React.Fragment>
                    ) : (
                    <img className="Post-photo" 
                        src={postPic}
                        alt=""/>)}
                </div>
                <hr className="Divider-line"/>
                <div className="Comments-section">
                    {this.ifCommentsDisplayed ? (
                        <ul className="Comments-list">
                            {comments.map((item, index) => {
                                const [author, date, content] = item
                                return <React.Fragment key={index}>
                                    <li className="Post-comment" >
                                        <PersonIcon className="Comment-icon" />
                                        <div className="Comment-header">    
                                            <span className="Comment-author">{author}</span>
                                            <span className="Comment-date">{date}</span>
                                        </div>
                                        <p className="Comment-content">{content}</p>
                                    </li>
                                    <hr className="Divider-line"/>
                                </React.Fragment>
                            })}
                            <form className="Comment-form" onSubmit={this.handleCommentSubmit}>
                                <textarea id="Comment-input"
                                        type="text" 
                                        placeholder={placeholderCaption}
                                        className="Comment-input"/>
                                <button type="submit"
                                        className="Comment-button">{buttonCaption}</button>
                            </form>
                            <hr className="Divider-line"/>
                        </ul>
                    ) : (<React.Fragment></React.Fragment>)}
                </div>                    
                <button onClick={this.displayComments} className="Comments-display-button">
                    <p className="Comments-display-caption">
                        {this.ifCommentsDisplayed ? hideCaption : showCaption}
                    </p>
                </button>
            </div>
        );
    }
}
