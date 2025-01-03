import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch blogs (async thunk)
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await fetch('http://localhost:5000/api/blogposts');
  const data = await response.json();
  return data;
});

// Create new blog (async thunk)
export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async ({ title, content, tags, images, token }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    images.forEach((image) => formData.append('images', image)); // Add images to formData

    const response = await fetch('http://localhost:5000/api/blogposts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in request headers
      },
      body: formData,
    });

    const data = await response.json();
    return data; // Return new blog data
  }
);

// Update blog (async thunk)
export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ _id, title, content, token }) => {
    const response = await fetch(`http://localhost:5000/api/blogposts/update/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Pass JWT token in the header
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    const data = await response.json();
    return data; // Return the updated blog data
  }
);

// Delete blog (async thunk)
export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (blogId) => {
  await fetch(`http://localhost:5000/api/blogposts/delete/${blogId}`, {
    method: 'DELETE',
  });
  return blogId; // Return the blogId to remove it from the store
});

// Slice
const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading'; // Set status to loading when the fetch starts
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded when data is fetched
        state.blogs = action.payload; // Set the fetched blogs in the state
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed if there's an error
        state.error = action.error.message; // Capture error message
      })

      // Create new blog
      .addCase(createBlog.fulfilled, (state, action) => {
        const newBlog = action.payload.newBlogPost; // Get the new blog from the response
        state.blogs.push(newBlog); // Add the new blog to the state
      })

      // Update blog
      .addCase(updateBlog.fulfilled, (state, action) => {
        const updatedBlog = action.payload;
        const existingBlog = state.blogs.find((blog) => blog._id === updatedBlog._id);
        if (existingBlog) {
          // If the blog exists in the state, update its details
          Object.assign(existingBlog, updatedBlog);
        }
      })

      // Delete blog
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const blogId = action.payload;
        state.blogs = state.blogs.filter((blog) => blog._id !== blogId); // Remove the deleted blog from the state
      });
  },
});

export default blogsSlice.reducer;
