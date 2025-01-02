import React, { useState, useEffect } from 'react';

const EditBlogModal = ({ blogId, currentTitle, currentContent, onClose, onUpdate }) => {
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);

  useEffect(() => {
    setTitle(currentTitle);
    setContent(currentContent);
  }, [currentTitle, currentContent]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');  // Get token from localStorage

    if (!token) {
      alert('You need to be logged in to edit the blog.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogposts/update/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the header
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onUpdate(data); // Pass updated blog data to parent component
        onClose();  // Close the modal after update
      } else {
        alert('Error updating blog.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while updating the blog.');
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Blog</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlogModal;
