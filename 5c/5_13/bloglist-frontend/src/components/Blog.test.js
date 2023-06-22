import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

//5.13
test('renders content', () => {
  const blog = {
    title: 'Blog testing is done with react-testing-library',
    author: "spre soare",
    url: "www.start.com",
    id: "648abfcc9dbbfdb4a701e5a6",
    likes: 23
  }

  render(<Blog blog={blog} />)

  const el = screen.getByTestId('toBe')
  expect(el).toBeInTheDocument()

  const el2 = screen.getByTestId('toNotBe')

  expect(el2).toHaveStyle('display: none')
  //expect(screen.getByText('23')).not.toBeInTheDocument()

})

//5.14
test('render url and likes after button pressed', () => {
  const blog = {
    title: 'Blog testing is done with react-testing-library',
    author: "spre soare",
    url: "www.start.com",
    id: "648abfcc9dbbfdb4a701e5a6",
    likes: 23
  }

  render(<Blog blog={blog} />)

userEvent.click(screen.getByTestId('toBeBtn'))

  //expect(el2).toHaveStyle('display: none')
  //expect(screen.getByText('23')).toBeInTheDocument()
  const el = screen.getByTestId('likeBtn')
  expect(el).toBeInTheDocument()

  const el2 = screen.getByTestId('nrLikes')
  expect(el2).toBeInTheDocument()

})