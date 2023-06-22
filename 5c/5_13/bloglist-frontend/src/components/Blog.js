import {useState,useImperativeHandle, forwardRef} from 'react'

const Blog = ({blog, username, deleteBlog}) => {
	console.log('blog', blog.id)
	const blogStyle = {
	    paddingTop: 10,
	    paddingLeft: 2,
	    border: 'solid',
	    borderWidth: 1,
	    marginBottom: 5
  	}
  	const [visible, setVisible] = useState(false)

  	const hideWhenVisible = {display: visible ? 'none' : ''}
	const showWhenVisible = {display: visible ? '' : 'none'}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const increaseLikes = () => {
		setVisible(!visible)
	}

return (
  <div style = {blogStyle}>
	  	<div style = {hideWhenVisible} data-testid = 'toBe'>
		    {blog.title}  {blog.author}
		    <button onClick = {toggleVisibility} data-testid = 'toBeBtn'>view</button>
	    </div>
	    <div style = {showWhenVisible} data-testid = 'toNotBe'>
		    {blog.title}  {blog.author}
		    <button onClick = {toggleVisibility} >hide</button> <br />
		    {blog.url}<br /> 
		    likes <span data-testid = 'nrLikes'> {blog.likes} </span> <button data-testid = 'likeBtn'>like</button> <br />
		    {username} <br />
		    <button onClick  = {deleteBlog}>remove</button>
	    </div>
  </div>  
)}

export default Blog