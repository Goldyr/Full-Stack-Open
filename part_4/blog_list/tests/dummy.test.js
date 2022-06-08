const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('max likes', () => {
  const listWithThreeBlogs = [
    {
      _id: '1',
      title: 'Go To Statement Considered Harmful',
      author: '1Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'Go To Statement Considered Harmful',
      author: '2 W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },
    {
      _id: '3',
      title: 'Go To Statement Considered Harmful',
      author: '3Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    }
  ]

  test('returns the object with the most likes (15)', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    expect(result.likes).toEqual(15)
  })
})

describe('Author with the most blogs', () => {
  const listWithThreeBlogs = [
    {
      _id: '1',
      title: 'Go To Statement Considered Harmful',
      author: 'W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'Go To Statement Considered Harmful',
      author: 'Not W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },
    {
      _id: '3',
      title: 'Go To Statement Considered Harmful',
      author: 'W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    }
    ,
    {
      _id: '4',
      title: 'Go To Stmful',
      author: 'W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 24,
      __v: 0
    }
  ]

  test('most blogs', () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs)
    expect(result.numberBlogs).toEqual(3)
  })
})

describe('Author with the most likes (total)', () => {
  const listWithThreeBlogs = [
    {
      _id: '1',
      title: 'Go To Statement Considered Harmful',
      author: 'W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'Go To Statement Considered Harmful',
      author: 'Not W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },
    {
      _id: '3',
      title: 'Go To Statement Considered Harmful',
      author: 'W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
    ,
    {
      _id: '4',
      title: 'Go To Stmful',
      author: 'W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 20,
      __v: 0
    }
  ]

  test('most liked blogs', () => {
    const result = listHelper.mostLikesTotal(listWithThreeBlogs)
    console.log(result);
    expect(result.likes).toEqual(30)
  })
})


