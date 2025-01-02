import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";

const EditBlogModal = ({ blogId, currentTitle, currentContent, onClose, onUpdate }) => {
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);

  useEffect(() => {
    setTitle(currentTitle);
    setContent(currentContent);
  }, [currentTitle, currentContent]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      alert("You need to be logged in to edit the blog.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogposts/update/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onUpdate(data); // Pass updated blog data to parent component
        onClose(); // Close the modal after update
      } else {
        alert("Error updating blog.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while updating the blog.");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-7xl p-12">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        <div className="space-y-8">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full py-4 px-6 border-2 border-gray-300 rounded-md text-lg"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              className="mt-1 w-full py-4 px-6 border-2 border-gray-300 rounded-md text-lg"
            />
          </div>
        </div>
        <DialogFooter className="space-x-6 mt-8">
          <Button variant="secondary" onClick={onClose} className="px-8 py-3 text-lg">
            Cancel
          </Button>
          <Button onClick={handleUpdate} className="px-8 py-3 text-lg">
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogModal;
