import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useDispatch } from 'react-redux';
import { createBlog, fetchBlogs } from '../redux/slices/blogsSlice'; // Import actions
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input'; // Import ReactTags

const CreateModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]); // Initialize tags as an empty array
  const [images, setImages] = useState([]);
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const handleFileChange = (e) => {
    setImages([...e.target.files]); // Handle multiple image files
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
    formData.append('tags', tags.map(tag => tag.text).join(',')); // Send tags as comma-separated string

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
        // Dispatch the createBlog action to update Redux store (optional)
        dispatch(createBlog(data.newBlogPost));

        // Dispatch fetchBlogs action to reload the blogs after creation
        dispatch(fetchBlogs());

        onClose(); // Close the modal after creation
      } else {
        alert('Error creating blog post: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while creating the blog post.');
    }
  };

  const handleTagChange = (newTags) => {
    setTags(newTags); // Ensure tag changes update the state
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* Trigger button to open modal, but will be hidden since modal is always open */}
        <div />
      </DialogTrigger>
      
      <DialogContent className="max-w-7xl p-12 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <div className="space-y-4">
            <label htmlFor="title" className="text-sm font-semibold text-gray-700">Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-4 px-6 border-2 border-gray-300 rounded-md text-lg"
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="content" className="text-sm font-semibold text-gray-700">Content</label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full py-4 px-6 border-2 border-gray-300 rounded-md text-lg"
              rows="6"
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="tags" className="text-sm font-semibold text-gray-700">Tags</label>

            {/* ReactTags for Tagging */}
            <ReactTags
              tags={tags}
              handleDelete={(i) => setTags(tags.filter((tag, index) => index !== i))}
              handleAddition={(tag) => setTags([...tags, tag])}
              handleDrag={(tag, currPos, newPos) => {
                const newTags = [...tags];
                newTags.splice(currPos, 1);
                newTags.splice(newPos, 0, tag);
                setTags(newTags);
              }}
              inputFieldPosition="bottom"
              placeholder="Add tags and press Enter"
              separators={[SEPARATORS.TAB, SEPARATORS.SPACE, SEPARATORS.COMMA]}
              handleTagChange={handleTagChange}
              classNames={{
                tagInputField: "w-full py-2 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                tag: "inline-flex items-center px-4 py-2 text-sm bg-blue-100 rounded-full text-blue-600 font-semibold mb-4",
                remove: "ml-2 cursor-pointer text-blue-500 hover:text-blue-700"
              }}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="images" className="text-sm font-semibold text-gray-700">Upload Images</label>
            <input
              type="file"
              id="images"
              className="w-full border border-gray-300 rounded-md p-4 text-lg"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>

        <DialogFooter className="space-x-6 mt-8">
          <Button variant="outline" onClick={onClose} className="px-8 py-3 text-lg">
            Cancel
          </Button>
          <Button onClick={handleCreate} className="px-8 py-3 text-lg">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
