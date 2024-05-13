import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/123.png'
import {FaBars} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import { useState ,useContext} from 'react'

import {UserContext} from '../context/userContext'

const Header = () => {
    const [close, setClose] =useState(window.innerWidth>800 ?true :false)
    const {currentUser} = useContext(UserContext)
    const closeNavHandler = () =>{
        if (window.innerWidth < 800){
            setClose(false)
        }else{
            setClose(true)
        }
    }
    return (
        <>
            <nav>
                <div className='container nav_container'>
                    <Link to='/' className='nav_logo'onClick={closeNavHandler}>
                        <img src={logo} alt="Navbar_logo" className='nav_img' />
                    </Link>
                    {currentUser?.id && close && <ul className="nav_menu">
                        <li><Link to={`/profile/${currentUser.id}`}onClick={closeNavHandler}>{currentUser?.name}</Link></li>
                        <li><Link to='/create'onClick={closeNavHandler}>Create Post</Link></li>
                        <li><Link to='/author'onClick={closeNavHandler}>Author</Link></li>
                        <li><Link to='/logout'onClick={closeNavHandler}>Logout</Link></li>
                    </ul>}
                    {!currentUser?.id && close && <ul className="nav_menu">
                        <li><Link to='/author'onClick={closeNavHandler}>Author</Link></li>
                        <li><Link to='/login'onClick={closeNavHandler}>Login</Link></li>
                    </ul>}
                    <button className="nav_toggle-btn" onClick={() => setClose(!close)}>
                        {close ? <AiOutlineClose /> : <FaBars /> } 
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Header