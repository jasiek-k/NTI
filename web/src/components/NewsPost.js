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

    handleInputChange = e => {

    } 

    render() {
        return(
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
                <div className="Post-content">{this.props.postContent}</div>
                <hr className="Divider-line"/>
                <div className="Comments-section">
                    {this.ifCommentsDisplayed ? (
                        <ul className="Comments-list">
                            {this.props.addedComments.map((item, index) => {
                                const [author, date, content] = item;
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
                                        placeholder="Comment here..."
                                        className="Comment-input"/>
                                <button type="submit" 
                                        value="Comment"
                                        className="Comment-button">Comment</button>
                            </form>
                            <hr className="Divider-line"/>
                        </ul>
                    ) : (<React.Fragment></React.Fragment>)}
                </div>                    
                <button onClick={this.displayComments} className="Comments-display-button">
                    <p className="Comments-display-caption">
                        {this.ifCommentsDisplayed ? "Hide comments section" : "Show comments section"}
                    </p>
                </button>
            </div>
        );
    }
}