import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

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
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* Trigger button to open modal, but will be hidden since modal is always open */}
        <div />
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-semibold text-gray-700">Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-semibold text-gray-700">Content</label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full"
              rows="4"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-semibold text-gray-700">Tags (comma separated)</label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="images" className="text-sm font-semibold text-gray-700">Upload Images</label>
            <input
              type="file"
              id="images"
              className="w-full border border-gray-300 rounded-md p-2"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>

        <DialogFooter className="space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
