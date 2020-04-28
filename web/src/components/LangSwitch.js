import React from 'react';
import './../styles/pageTheme.css';


export default class LangSwitch extends React.Component {

    chooseLang = e => {
        this.props.langSwitchHandling(e)    
    };

    render() {
        return(
            <div className="LangSwitch-container">
                <p className="LangSwitch-caption">Languages</p>
                <p className="LangSwitch-item" onClick={this.chooseLang}>Polski</p>
                <p className="LangSwitch-item" onClick={this.chooseLang}>English</p>
            </div>
        );
    }
}