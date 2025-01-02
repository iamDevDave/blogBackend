import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';  // Your BlogCard component
import EditBlogModal from '../models/BlogEditModal';
import DeleteBlogModal from '../models/DeleteBlogModal';  // The DeleteBlogModal component

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('http://localhost:5000/api/blogposts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  const openEditModal = (blog) => {
    setBlogToEdit(blog);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (blogId) => {
    setBlogToDelete(blogId);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setBlogToEdit(null);
    setBlogToDelete(null);
  };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs((prevBlogs) => 
      prevBlogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
    );
  };

  const handleDeleteBlog = (deletedBlogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== deletedBlogId));
  };

  return (
    <div>
      <h2>All Blogs</h2>
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-4">
            <BlogCard
              blog={blog}
              onEdit={() => openEditModal(blog)}
              onDelete={() => openDeleteModal(blog._id)}
            />
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && blogToEdit && (
        <EditBlogModal
          blogId={blogToEdit._id}
          currentTitle={blogToEdit.title}
          currentContent={blogToEdit.content}
          onClose={closeModals}
          onUpdate={handleUpdateBlog}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteBlogModal
          blogId={blogToDelete}
          onClose={closeModals}
          onDelete={handleDeleteBlog}
        />
      )}
    </div>
  );
};

export default AllBlogs;
