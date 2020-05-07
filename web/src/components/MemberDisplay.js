import React from 'react'


export default class MemberDisplay extends React.Component {

    render() {
        let [memberPhoto, memberName, memberBio] = this.props.memberContent

        if (memberPhoto !== null) {
            let imagesDir = require.context("./../utils/img", false)
            memberPhoto = imagesDir(memberPhoto)
        } 

        return (
            <div className="Member-container">
                <img className="Member-photo" src={memberPhoto}></img>
                <div className="Member-info">
                    <p className="Member-name">{memberName}</p>
                    <p className="Member-bio">{memberBio}</p>
                </div>
            </div>
        )
    }
}