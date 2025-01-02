import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';

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
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-700">Are you sure you want to delete this blog?</p>
        </div>

        <DialogFooter className="space-x-4 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBlogModal;
