import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      <section className='error_page'>
        <center>
          <div className="center">
            <Link to='/' className='btn primary'>GO Back Home</Link>
            <h2>Page Not Found</h2>
          </div>
        </center>
      </section>
    </>
  )
}

export default ErrorPage