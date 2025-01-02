import React, { useState } from 'react';

const CreateModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleCreate = async () => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
      alert('You need to be logged in to create a blog.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);

    // Append images to the form data
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/blogposts/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Add token for authorization
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        onCreate(data.newBlogPost); // Pass the new blog post data to parent
        onClose(); // Close the modal after creation
      } else {
        alert('Error creating blog post: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while creating the blog post.');
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Blog Post</h5>
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
            <div className="form-group mt-2">
              <label htmlFor="tags">Tags (comma separated)</label>
              <input
                type="text"
                id="tags"
                className="form-control"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="images">Upload Images</label>
              <input
                type="file"
                id="images"
                className="form-control"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleCreate}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
