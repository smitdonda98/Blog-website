import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({})

  useEffect(() => {
    const getAuthor = async () => {
      // Check if authorID exists before making the request
      if (authorID) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
          // console.log(response);
          setAuthor(response?.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getAuthor();
  }, [authorID]);


  return (
    <>
      <Link to={`/posts/users/${authorID}`} className='post__author'>
        <div className="post_author-avatar">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt="" className='img_avatar' />
        </div>
        <div className="posts_author-details">
          <h5>By: {author?.name}</h5>
          <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US' /></small>
        </div>
      </Link>
    </>
  )
}

export default PostAuthor