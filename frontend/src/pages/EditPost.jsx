import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/userContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditPost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')

  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token;
  const navigator = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    if (!token) {
      navigator('/login')
    }
  }, [])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'bolditalic'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }
  //   I
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const POST_CATEGORIES = [
    "Agriculture", "Business", "Education", "Entertainment",
    "Art", "Investment", "Uncategorized", "Weather"]

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setCategory(response.data.category)
      } catch (error) {
        console.log(error);
      }
    }
    getPost();
  },[])

  const editPost = async (e) => {
    e.preventDefault()

    const postData = new FormData();
    postData.set('title' , title)
    postData.set('category' , category)
    postData.set('description' , description)
    postData.append('thumbnail' , thumbnail)

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}` , postData , {withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      if(response.status == 200){
        return navigator('/')
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <>
      <section className="create-post">
        <div className="container">
          <h2>Edit Post</h2>
          {error && <p className="form_error-message">{error}</p>}
          <form className="form create-post_form" onSubmit={editPost}>
            <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
            <select name="category" value={category} onChange={e => setCategory(e.target.value)}>

              {
                POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
              }
            </select>
            <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
            <input type="file" onChange={e => setThumbnail(e.target.value(0))} accept='jpg , png, jpeg' />
            <button type="submit" className='btn primary'>Update</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default EditPost