import React, { useContext, useEffect, useState } from 'react'
// import Thumbnail1 from '../images/blog1.jpg'
// import Thumbnail2 from '../images/blog2.jpg'
// import Thumbnail3 from '../images/blog3.jpg'
// import Thumbnail4 from '../images/blog4.jpg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'

// const Dummy = [
//   {
//     id: '1',
//     thumbnail: Thumbnail1,
//     category: 'education',
//     title: 'This is the title of the very first post on this blog. ',
//     desc: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellendus, nesciunt hic non voluptatem at, maxime adipisci eligendi et vel nostrum error rerum omnis fuga nihil voluptatibus veritatis fugit perspiciatis',
//     authorID: 3
//   },
//   {
//     id: '2',
//     thumbnail: Thumbnail2,
//     category: 'science',
//     title: 'This is the title of the very secound post on this blog. ',
//     desc: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellendus, nesciunt hic non voluptatem at, maxime adipisci eligendi et vel nostrum error rerum omnis fuga nihil voluptatibus veritatis fugit perspiciatis',
//     authorID: 3
//   },
//   {
//     id: '3',
//     thumbnail: Thumbnail3,
//     category: 'weather',
//     title: 'This is the title of the very third post on this blog. ',
//     desc: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellendus, nesciunt hic non voluptatem at, maxime adipisci eligendi et vel nostrum error rerum omnis fuga nihil voluptatibus veritatis fugit perspiciatis',
//     authorID: 3
//   },
//   {
//     id: '4',
//     thumbnail: Thumbnail4,
//     category: 'farming',
//     title: 'This is the title of the very fourth post on this blog. ',
//     desc: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellendus, nesciunt hic non voluptatem at, maxime adipisci eligendi et vel nostrum error rerum omnis fuga nihil voluptatibus veritatis fugit perspiciatis',
//     authorID: 3
//   },
// ]

const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const [isLoading ,setIsLoading] = useState(false);
  const {id} = useParams()

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;
  const navigator = useNavigate()

  useEffect(() => {
    if(!token){
      navigator('/login')
    }
  },[])



    useEffect(() =>{
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,{withCredentials:true, headers: {Authorization: `Bearer${token}`}})
          setPosts(response.data)
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false)
      }
      fetchPosts();
    },[])


  return (
    <>
      <section className="dashboard">
        {
          posts.length ? <div className="container dashboard__container">
            {
              posts.map(post => {
                return <article key={post.id} className='dashboard__post'>
                  <div className="dashboard__post-info">
                    <div className="dashboard__post-thumbnail">
                      <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" className='thumbnail_img' />
                    </div>
                    <h5>{post.title}</h5>
                  </div>
                  <div className="dashboard__post-actions">
                    <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                    <Link to={`/post/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                    <DeletePost postId={post._id}/>
                  </div>
                </article>
              })
            }
          </div> : <center><h2>You have no posts yet</h2></center>
        }
      </section>
    </>
  )
}

export default Dashboard