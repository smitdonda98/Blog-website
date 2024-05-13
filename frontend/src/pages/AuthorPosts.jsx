import React, { useEffect, useState } from 'react'
import PostThing from '../components/PostThing'
import Loader from '../components/Loader'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const AuthorPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {id} = useParams()

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`);
                // console.log(response.data);
                setPosts(response.data);
            } catch (err) {
                console.log(err);
            }
            setIsLoading(false);
        };
        fetchPosts();
    }, [id]);

    if (isLoading) {
        return (
            <>
            <Loader />
            </>
        );
    }
    return (
        <>
            <section className='posts'>
                {posts.length > 0 ? <div className="container posts__container">
                    {
                        posts.map(({ _id:id, thumbnail, category, title, desc, creator, createdAt}) => <PostThing key={id} postID={id} thumbnail={thumbnail} category={category} title={title} desc={desc} authorID={creator} createdAt={createdAt} />)
                    }

                </div> : <center><h2>No Posts Found</h2></center>}

            </section>
        </>
    )
}

export default AuthorPosts