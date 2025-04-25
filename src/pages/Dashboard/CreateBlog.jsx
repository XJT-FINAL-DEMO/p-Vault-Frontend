import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, Save, X, Image, Upload } from "lucide-react";
import Blog1 from "../../assets/images/blog1.jpeg"
import Blog2 from "../../assets/images/blog2.png"

export default function CreateBlog() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch blogs from API (mock data for now)
    const mockBlogs = [
      {
        id: 1,
        title: "Managing Diabetes: Tips for Patients",
        content: "Diabetes management requires consistent monitoring and lifestyle adjustments...",
        tags: ["Diabetes", "Health Tips", "Chronic Care"],
        author: "Dr. Smith",
        date: "April 15, 2025",
        imageUrl: Blog1,
      },
      {
        id: 2,
        title: "COVID-19 Variants: What You Need to Know",
        content: "As the virus continues to evolve, understanding the different variants is crucial...",
        tags: ["COVID-19", "Public Health", "Vaccines"],
        author: "Dr. Smith",
        date: "April 10, 2025",
        imageUrl: Blog2,
      }
    ];
    setBlogs(mockBlogs);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      // Create preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() !== "" && !tagsList.includes(currentTag.trim())) {
      setTagsList([...tagsList, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTagsList(tagsList.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would upload the image to a server and get a URL back
    // For this example, we'll use the preview URL or a placeholder
    const imageUrl = imagePreview || (image ? URL.createObjectURL(image) : null);
    
    if (isEditing) {
      // Update existing blog
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === editingId) {
          return {
            ...blog,
            title,
            content,
            tags: tagsList,
            imageUrl: imageUrl || blog.imageUrl, // Keep old image if no new one
            date: new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })
          };
        }
        return blog;
      });
      
      setBlogs(updatedBlogs);
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Create new blog
      const newBlog = {
        id: Date.now(), // More unique than blogs.length + 1
        title,
        content,
        tags: tagsList,
        imageUrl,
        author: "Dr. Smith", // This would come from user context in a real app
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      };
      
      setBlogs([...blogs, newBlog]);
    }
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTagsList([]);
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setTagsList(blog.tags || []);
    setIsEditing(true);
    setEditingId(blog.id);
    setPreviewMode(false);
    
    // Set image preview if blog has an image
    if (blog.imageUrl) {
      setImagePreview(blog.imageUrl);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const cancelEdit = () => {
    resetForm();
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-600">
        {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter blog title"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Image
                </label>
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  
                  {imagePreview ? (
                    <div className="relative w-full mb-2">
                      <img 
                        src={imagePreview} 
                        alt="Blog preview" 
                        className="w-full max-h-80 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={handleImageClick}
                      className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <Image size={40} className="text-gray-400 mb-2" />
                      <p className="text-gray-500 text-center">Click to upload an image</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG (max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <div className="flex space-x-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(false)}
                    className={`px-3 py-1 text-sm rounded-md ${!previewMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Write
                  </button>
                  <button
                    type="button" 
                    onClick={() => setPreviewMode(true)}
                    className={`px-3 py-1 text-sm rounded-md ${previewMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Preview
                  </button>
                </div>
                
                {previewMode ? (
                  <div className="border border-gray-300 rounded-md p-4 min-h-64 prose max-w-full">
                    {content ? (
                      <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
                    ) : (
                      <p className="text-gray-400">Preview will appear here</p>
                    )}

                  </div>
                ) : (
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-64"
                    placeholder="Write your blog content here"
                    required
                  />
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="tags"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add tags (press Enter to add)"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {tagsList.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-blue-800 hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                >
                  <Save size={18} className="mr-1" />
                  {isEditing ? "Update Post" : "Publish Post"}
                </button>
                
                {isEditing && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Your Blog Posts</h2>
            
            {blogs.length === 0 ? (
              <p className="text-gray-500">No blog posts yet.</p>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog.id} className="border-b border-gray-200 pb-4 last:border-0">
                    {blog.imageUrl && (
                      <div className="mb-2">
                        <img 
                          src={blog.imageUrl} 
                          alt={blog.title} 
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                    <h3 className="font-medium text-blue-600">{blog.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {blog.tags && blog.tags.map((tag, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                      >
                        <Pencil size={16} className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-800 flex items-center text-sm"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}