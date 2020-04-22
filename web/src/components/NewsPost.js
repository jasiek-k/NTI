import React from 'react';
import './../styles/subpageTheme.css';
import { PostLogo } from './../utils/icons';

export default class NewsPost extends React.Component {

    render() {
        return(
            <div className="Post-container">
                <div className="Post-header">
                    <PostLogo />
                    <p className="Post-date">{this.props.postDate}</p>
                    <p className="Post-tags">{this.props.postTags.map((item) => {
                        return <p>#{item}</p>
                    })}</p>
                </div>
                <div className="Post-content">{this.props.postContent}</div>
            </div>
        );
    }
}