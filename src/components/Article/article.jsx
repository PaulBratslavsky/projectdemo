import React from 'react'
import { Image } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

export default function Article({ article }) {
  const { title, content, author, thumbnail } = article;
  const { url } = thumbnail.formats.large;
  console.log(url);
  return (
    <div className="p-2 mb-3 shadow rounded">
      <div>{title}</div>
      <Image src={url} />
      <ReactMarkdown>{content}</ReactMarkdown>
      <div>{author.username}</div>
    </div>
  )
}
