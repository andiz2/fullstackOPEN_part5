import {useState,useImperativeHandle, forwardRef} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, username, deleteBlog, addLike}) => {
	console.log('blog', blog.id)
	const blogStyle = {
	    paddingTop: 10,
	    paddingLeft: 2,
	    border: 'solid',
	    borderWidth: 1,
	    marginBottom: 5
  	}
  	const [visible, setVisible] = useState(false)
  	const [likes, setLikes] = useState(false)

  	const hideWhenVisible = {display: visible ? 'none' : ''}
	const showWhenVisible = {display: visible ? '' : 'none'}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const increaseLikes = () => {
		setVisible(!visible)
	}
	
	const increaseLikes2 = (event) => {
	    event.preventDefault()
	    const updatedBlogObject = {
	      title: blog.title,
	      author: blog.author,
	      url: blog.url,
	      likes: blog.likes + 1,
	      id: blog.id,
	      //name: blog.user.name,
	      //username: blog.user.username,
	    }
	    setLikes(updatedBlogObject.likes)
	    console.log('event', event)
	    console.log('blog', blog)
	    console.log('updatedBlogObject.id', updatedBlogObject.id)

	    blogService
	      .update(updatedBlogObject.id, updatedBlogObject)
	      .then(response => {
	        console.log('blogs din bla', updatedBlogObject.id)
	      })
	    
 	 }


  return (
  <div style = {blogStyle}>
	  	<div style = {hideWhenVisible}>
		    {blog.title}  {blog.author}
		    <button onClick = {toggleVisibility} >view</button>
	    </div>
	    <div style = {showWhenVisible}>
		    {blog.title}  {blog.author}
		    <button onClick = {toggleVisibility} >hide</button> <br />
		    {blog.url}<br /> 
		    likes {blog.likes}  <button onClick = {addLike}>like</button> <br />
		    {username} <br />
		    <button onClick  = {deleteBlog}>remove</button>
	    </div>
  </div>  
)}

export default Blog