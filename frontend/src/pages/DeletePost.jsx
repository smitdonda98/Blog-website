import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader'


const DeletePost = ({postId: id}) => {
  
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading , setIsLoading] = useState(false)

  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  },[])


  const removePost = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Error removing post:", error);
    }
  }

  if(isLoading){
    return <Loader/>
  }
  return (
    <>
    <Link className='btn sm danger' onClick={()=> removePost(id)}>Delete</Link>
    </>
  )
}

export default DeletePost