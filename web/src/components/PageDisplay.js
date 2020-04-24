import React from 'react';
import Navbar from './Navbar';
import LangSwitch from './LangSwitch';
import './../styles/pageTheme.css';
import * as pageContent from './../utils/lang/ln_en.json';
import NewsPost from './NewsPost';
import data from './../utils/data.json';

export default class PageDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLang: "",
            currentSubpage: ""
        }
    }

    langSwitchHandling = () => {
        console.log("test")
    }

    render() {
        var {post, comments} = data;
        var {date, tags, hearts, content} = post;
        console.log(post, comments);
        
        return(
            <div className="Page-content">
                <Navbar navbarContent={pageContent.navbarContent} />
                <LangSwitch langSwitchHandling={this.langSwitchHandling} />
                <div className="Subpage-content">
                    <NewsPost   postDate={date}
                                postTags={tags}
                                postContent={content}
                                addedComments={comments}/>
                </div>
            </div>
        );
    }
}
