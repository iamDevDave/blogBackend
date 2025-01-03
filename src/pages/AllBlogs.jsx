import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs, updateBlog, deleteBlog } from '../redux/slices/blogsSlice';
import BlogCard from '../components/BlogCard';
import EditBlogModal from '../models/BlogEditModal';
import DeleteBlogModal from '../models/DeleteBlogModal';

const AllBlogs = () => {
  const { blogs, status, error } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

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

  const handleUpdateBlog = async (updatedBlog) => {
    await dispatch(updateBlog(updatedBlog));
    closeModals();
  };

  const handleDeleteBlog = async () => {
    await dispatch(deleteBlog(blogToDelete));
    closeModals();
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id}>
              <BlogCard
                blog={blog}
                onEdit={() => openEditModal(blog)}
                onDelete={() => openDeleteModal(blog._id)}
              />
            </div>
          ))}
        </div>
      )}

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
