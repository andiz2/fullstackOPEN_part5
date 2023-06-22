import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newLikes, setNewLikes] = useState('')
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

  const blogFormRef = useRef()


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


  const addBlog = (event) => {
       
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    }
    setBlogs(blogs.concat(blogObject))
    console.log("blogs", blogs)
    console.log("newTitle", newTitle)
    console.log("blogObject", blogObject)
    console.log("newLikes", newLikes)

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
    setNewLikes('')
  }

  const deleteBlog = (blogErase) =>{
    console.log('deleteContact', blogErase)
    var newList = [...blogs]
    let toDelete = newList.find(blog => blog.id === blogErase)
    console.log('toDelete', toDelete)
    if(window.confirm(`Removing blog ${toDelete.title} by ${toDelete.author}`)){
      blogService
        .deleteBlog(blogErase)
        .then(deletedlBlog => {
          console.log(deletedlBlog)
        })
      newList = [...blogs]
      newList = newList.filter(blog => blog.id !== blogErase)
      console.log('newList', newList)
      setBlogs(newList)
    }
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

   {!user && 
    <Togglable buttonLabel = "log in">

        <LoginForm
              username = {username}
              password = {password}
              handleUsernameChange = {({target}) => setUsername(target.value)}
              handlePasswordChange = {({target}) => setPassword(target.value)}
              handleSubmit = {handleLogin}
          />
    </Togglable>
  }
     
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in
        <form onSubmit = {handleLogout}>
            <button type="submit">logout</button>
          </form></p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <h3>Create new</h3>
            <BlogForm addBlog = {addBlog} 
                 newTitle = {newTitle} 
                 handleTitleChange = {handleTitleChange} 
                 newAuthor = {newAuthor}
                 handleAuthorChange = {handleAuthorChange}
                 newUrl = {newUrl}
                 handleUrlChange = {handleUrlChange}
             />
        </Togglable>
        
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} username = {user.name}
            deleteBlog = {() => deleteBlog(blog.id)}
              />
          )}
        </div>
      }    
      
    </div>
  )
}

export default App