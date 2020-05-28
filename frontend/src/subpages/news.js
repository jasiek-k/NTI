import React from 'react'
import NewsPost from './../components/NewsPost'
import './../styles/subpageTheme.css'


export default class News extends React.Component {
    render() {
        return (
            <div className="News-subpage">
                {this.props.subpageContent.map((item) => {
                    var {comments, content, date, hearts, id, photo, tags} = item
                    return <NewsPost newsPostContent={this.props.newsContent}
                            key={id}
                            postDate={date}
                            postTags={tags}
                            postContent={content}
                            postHearts = {hearts}
                            postPhoto = {photo}
                            addedComments={comments}/>
                })}
            </div>
        )
    }
}