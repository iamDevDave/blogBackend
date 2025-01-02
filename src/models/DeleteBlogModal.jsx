import React from 'react';

const DeleteBlogModal = ({ blogId, onClose, onDelete }) => {

  const handleDelete = async () => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!token) {
      alert('You need to be logged in to delete the blog.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogposts/delete/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in Authorization header
        },
      });

      if (response.ok) {
        onDelete(blogId); // Pass the deleted blog's ID to parent component
        onClose();  // Close modal after deletion
      } else {
        alert('Error deleting blog.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while deleting the blog.');
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this blog?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
