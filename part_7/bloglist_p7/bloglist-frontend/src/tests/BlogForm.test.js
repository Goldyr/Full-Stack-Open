import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('BlogForm:', () => {

    const createBlogMockHandler = jest.fn()
    test('Check that the form calls the event handler it received as props with the right details when a new blog is created.', async() => {
        render(<BlogForm createBlog = {createBlogMockHandler}/>)
        const actualUser =  userEvent.setup()
        const input_title = screen.getByPlaceholderText('title')
        const input_author = screen.getByPlaceholderText('author')
        const input_url = screen.getByPlaceholderText('url')
        const submit_button = screen.getByText('create')

        await userEvent.type(input_title, 'this is a title')
        await userEvent.type(input_author, 'this is an author')
        await userEvent.type(input_url, 'this is an url')
        await actualUser.click(submit_button)


        expect(createBlogMockHandler.mock.calls).toHaveLength(1)

    })
})
