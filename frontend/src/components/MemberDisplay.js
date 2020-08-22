import React from 'react'
import './../styles/subpageTheme.css'


const MemberDisplay = props => {
  let [memberPhoto, memberName, memberBio] = props.memberContent

  if (memberPhoto !== null) {
    let imagesDir = require.context("./../utils/img", false)
    memberPhoto = imagesDir(memberPhoto)
  } 

  return (
    <div className="Member-container">
      <img className="Member-photo" 
        src={memberPhoto}
        alt=""></img>
      <div className="Member-info">
      {
        [
          { class: "Member-name", item: memberName },
          { class: "Member-bio", item: memberBio }
        ].map((item, index) => <p 
          className={item.class}
          key={index}>{item.item}</p>)
      }
      </div>
    </div>
  )
}

export default MemberDisplay
