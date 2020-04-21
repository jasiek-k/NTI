import React from 'react';

export default class LangSwitch extends React.Component {

    chooseLang = (e) => {
        console.log(e)
    }

    render() {
        return(
            <div>
                <p>Languages</p>
                <p onClick={this.chooseLang}>Polski</p>
                <p onClick={this.chooseLang}>English</p>
            </div>
        )
    }
}