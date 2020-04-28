import React from 'react'
import NewsPost from './../components/NewsPost'
import './../styles/subpageTheme.css'


export default class News extends React.Component {

    render() {
        const subpageContent = this.props.subpageContent
        let displayedNews = []

        for (let i = 0; i < subpageContent.length; i++) {
            var {comments, content, date, hearts, id, photo, tags} = subpageContent[i]
            displayedNews.push(<NewsPost    newsPostContent={this.props.newsContent}
                                            key={id}
                                            postDate={date}
                                            postTags={tags}
                                            postContent={content}
                                            postHearts = {hearts}
                                            postPhoto = {photo}
                                            addedComments={comments}/>)
        }

        return (
            <div className="News-subpage">
                {displayedNews}
            </div>
        )
    }
}