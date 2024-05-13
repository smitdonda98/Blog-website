import React, { useEffect, useState } from 'react'
import PostThing from './PostThing'
import Loader from '../components/Loader'
import axios from 'axios'


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                // Assuming the API endpoint is '/posts'
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
                // console.log(response.data);
                setPosts(response.data);
            } catch (err) {
                console.log(err);
            }
            setIsLoading(false);
        };
        fetchPosts();
    }, []);

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

export default Posts