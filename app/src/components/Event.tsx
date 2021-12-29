import React from 'react'

interface Props {
  heading: string;
  content: string;
  tags: string[];
}

const Event: React.FC<Props> = ({ tags, heading, content }) => {
  return (
    <div className="bg-transparent mt-4">
      <h3 className="text-gray-600 text-sm bg-transparent">{heading}</h3>
      <p className="bg-transparent text-sm">{content}</p>
      <p className="text-twitter-blue bg-transparent text-xs mt-2">{tags.map(tag => `#${tag} `)}
      </p>
    </div>
  )
}

export default Event

