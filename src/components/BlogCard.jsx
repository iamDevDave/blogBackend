import React from 'react';

const BlogCard = ({ blog, onEdit, onDelete }) => {
  return (
    <div className="card">
      <img
        src={blog.images.length > 0 ? blog.images[0] : 'https://via.placeholder.com/150'}
        className="card-img-top"
        alt={blog.title}
      />
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.content.substring(0, 100)}...</p>
        <button className="btn btn-primary" onClick={onEdit}>Edit</button>
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default BlogCard;
