import React from 'react'
import NewsPost from './../components/NewsPost'
import './../styles/subpageTheme.css'
import axios from 'axios'


export default class News extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayedData: []
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts = () => {
        axios
            .get("http://127.0.0.1:5000/news")
            .then(res => {
                this.setState({
                    displayedData: res.data.posts
                })
            })
            .catch(err => console.log(err))
    }

    addComment = value => {
        //console.log(value["comment"])
        //console.log(value["post_id"])
        this.sendResponse(value)
        this.getPosts()
    }

    sendResponse = comment => {
        console.log(comment)
        axios.post(
            'http://127.0.0.1:5000/comment', 
            null, {
                params: comment
            } ,
            {
                "Access-Control-Allow-Origin": "*",
                //"Content-Type": "text/html; charset=utf-8",
                //"Accept": "application/json",
                "Access-Control-Request-Method": "POST"
            }
        )
        .then((response) => {
            console.log(response.data)
        }, (error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="News-subpage">
                {[...this.state.displayedData].map((item, index) => {
                    return <NewsPost newsPostContent={this.props.newsContent}
                                addComment={this.addComment}
                                content={item}
                                key={index}/>
                })}
            </div>
        )
    }
}