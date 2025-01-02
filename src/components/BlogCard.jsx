import React from "react";
import { Button } from "./ui/button";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  return (
    <div className="rounded-lg border shadow-md overflow-hidden bg-white">
      <img
        src={blog.images.length > 0 ? blog.images[0] : "https://via.placeholder.com/150"}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h5 className="text-xl font-bold text-gray-800">{blog.title}</h5>
        <p className="text-gray-600 mt-2">{blog.content.substring(0, 100)}...</p>
        <div className="flex justify-between mt-4">
          <Button variant="default" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
