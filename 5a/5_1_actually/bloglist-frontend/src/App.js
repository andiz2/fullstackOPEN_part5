import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [showAll, setShowAll] = useState(true)

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username and password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>  
    </>    
  )

  const addBlog = (event) => {
       
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    setBlogs(blogs.concat(blogObject))
    console.log("blogs", blogs)
    console.log("newTitle", newTitle)
    console.log("blogObject", blogObject)

    setErrorMessage(
            `Added ${blogObject.title} by ${blogObject.author}`
          )
          setTimeout(() => {
            console.log('intra in settimeout errorMessage?', errorMessage)
            console.log('nameobject din settimeout', blogObject.title)
            setErrorMessage(null)
          }, 5000)

    blogService
      .create(blogObject)
      .then(response => {
        console.log('blogs din valiblogs', blogs)
      })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

   const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }


  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }


  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }



  return (
  <div>
   <Notification message={errorMessage} />

   {!user && loginForm()} 
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in 
        <form onSubmit = {handleLogout}>
          <button type="submit">logout</button>
        </form>
        </p> 
        <h3>Create new</h3>
        <BlogForm addBlog = {addBlog}
         newTitle = {newTitle} 
         handleTitleChange = {handleTitleChange} 
         newAuthor = {newAuthor}
         handleAuthorChange = {handleAuthorChange}
         newUrl = {newUrl}
         handleUrlChange = {handleUrlChange}/>


        
          
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }    
      
    </div>
  )
}

export default App