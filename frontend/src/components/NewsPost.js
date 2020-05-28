import React from 'react'
import './../styles/subpageTheme.css'
import { PostLogo, PersonIcon, FavouriteOutline, FavouriteFilled } from './../utils/icons'


export default class NewsPost extends React.Component {

    constructor(props) {
        super(props)
        this.counterRef = React.createRef()
    }

    ifCommentsDisplayed = false
    ifPostHearted = false

    displayComments = e => {
        this.ifCommentsDisplayed = this.ifCommentsDisplayed ? false : true
        this.forceUpdate()
    }

    handleCommentSubmit = e => {
        e.preventDefault()
    }

    handlePostHeart = e => {
        //this.ifCommentsDisplayed = this.ifCommentsDisplayed ? false : true
        //this.forceUpdate()
        const counterValue = this.refs.counterRef;
        console.log(counterValue)
    }

    handleInputChange = e => {} 

    render() { 
        let imagesDir = ""
        let postPic = ""
        const { postContent } = this.props.newsPostContent 
        const [ showCaption, hideCaption, buttonCaption, placeholderCaption ] = postContent

        if (this.props.postPhoto !== "null") {
            imagesDir = require.context("./../utils/img", false)
            postPic = imagesDir(this.props.postPhoto)
        }  

        return (
            <div className="Post-container">
                <div className="Post-header">
                    <PostLogo />
                    <p className="Post-date">{this.props.postDate}</p>
                    <div className="Favourites-clicker">
                        <span className="Hearts-counter" ref={this.counterRef}>{this.props.postHearts}</span>
                        <FavouriteOutline onClick={this.handlePostHeart} className="Favourites-icon"/>
                    </div>
                    <p className="Post-tags-container">{this.props.postTags.map((item, index) => {
                        return <span className="Post-tag" key={index}>{`#${item}`}</span>
                    })}</p>
                </div>
                <div className="Post-content">
                    <p className="Post-paragraph">{this.props.postContent}</p>
                    {this.props.postPhoto === "null" ? (
                    <React.Fragment></React.Fragment>
                    ) : (<img className="Post-photo" src={postPic}/>)}
                </div>
                <hr className="Divider-line"/>
                <div className="Comments-section">
                    {this.ifCommentsDisplayed ? (
                        <ul className="Comments-list">
                            {this.props.addedComments.map((item, index) => {
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
                                <textarea  onChange={this.handleInputChange} 
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