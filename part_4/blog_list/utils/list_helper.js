
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favoriteBlog = (blogs) => {
  let maxLikes = 0
  let favBlog
  blogs.forEach((blog) => {
    if (blog.likes >= maxLikes) {
      maxLikes = blog.likes
      favBlog = blog
    }
  })
  return favBlog
}

const mostBlogs = (blogs) => {
  let authorMostBlogs = {
    author: '',
    numberBlogs: 0
  }
  // I search through every blog
  blogs.forEach(blog => {
    const authorCounter = {
      author: blog.author,
      numberBlogs: 0
    }
    // Count every time author from the first iteration is repeteated
    blogs.forEach(bl => {
      if (bl.author === authorCounter.author)authorCounter.numberBlogs++
    })
    // Asign it to a variable that compares it to the greatest number
    if (authorCounter.numberBlogs > authorMostBlogs.numberBlogs)authorMostBlogs = authorCounter
  })
  return authorMostBlogs
}

const mostLikesTotal = (blogs) => {
  let authorMostLiked = {
    author: '',
    likes: 0
  }
  blogs.forEach(blog => {
    const authorCounter = {
      author: blog.author,
      likes: 0
    }
    blogs.forEach(bl => {
      if (bl.author === authorCounter.author) {
        authorCounter.likes += bl.likes
      }
    })
    if (authorCounter.likes > authorMostLiked.likes)authorMostLiked = authorCounter
  })
  return authorMostLiked
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikesTotal
}
