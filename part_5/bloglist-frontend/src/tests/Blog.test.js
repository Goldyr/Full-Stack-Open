import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('Blog :', () => {

    const blog = {
        id: 'id',
        author: 'author',
        url: 'url',
        title: 'title',
        likes: 0,
        user: {
            name:'name',
            username:'username',
            token:'token'
        }
    }
    const user = {
        id: 'id',
        name: 'name',
        username: 'username'
    }
    const likeMockHandler = jest.fn()
    const deleteMockHandler = jest.fn()

    test('renders the blogs title and author, but does not render its url or number of likes by default.', () => {
        render(<Blog blog={blog} likeButtonHandler={likeMockHandler} deleteButtonHandler={deleteMockHandler} user={user}/>)
        const title_author = screen.getByText('title author')
        const url_likes = screen.queryByText('url 0')
        expect(title_author).toBeDefined()
        expect(title_author).not.toBeNull()
        expect(url_likes).toBeNull()
    })

    test('checks that the blogs url and number of likes are shown when the button controlling the shown details has been clicked', async() => {
        render(<Blog blog={blog} likeButtonHandler={likeMockHandler} deleteButtonHandler={deleteMockHandler} user={user}/>)
        const url_likes = screen.queryByText('url 0')
        expect(url_likes).toBeNull()
        const actualUser = userEvent.setup()
        const button = screen.getByText('info')
        await actualUser.click(button)
        expect(url_likes).toBeDefined()
    })

    test('if the like button is clicked twice, the event handler the component received as props is called twice', async() => {
        render(<Blog blog={blog} likeButtonHandler={likeMockHandler} deleteButtonHandler={deleteMockHandler} user={user}/>)
        const actualUser = userEvent.setup()
        const info_button = screen.getByText('info')
        await actualUser.click(info_button)
        const like_button = screen.getByText('Like')

        for(let i = 0; i<2; i++){
            await actualUser.click(like_button)
        }
        expect(likeMockHandler.mock.calls).toHaveLength(2)
    })

}
)
