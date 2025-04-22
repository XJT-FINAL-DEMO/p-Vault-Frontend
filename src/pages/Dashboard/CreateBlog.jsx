
import { useState, useEffect } from "react";
import { Pencil, Trash2, Save, X } from "lucide-react";

export default function CreateBlog() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Fetch blogs from API (mock data for now)
    const mockBlogs = [
      {
        id: 1,
        title: "Managing Diabetes: Tips for Patients",
        content: "Diabetes management requires consistent monitoring and lifestyle adjustments...",
        tags: ["Diabetes", "Health Tips", "Chronic Care"],
        author: "Dr. Smith",
        date: "April 15, 2025"
      },
      {
        id: 2,
        title: "COVID-19 Variants: What You Need to Know",
        content: "As the virus continues to evolve, understanding the different variants is crucial...",
        tags: ["COVID-19", "Public Health", "Vaccines"],
        author: "Dr. Smith",
        date: "April 10, 2025"
      }
    ];
    setBlogs(mockBlogs);
  }, []);

  const handleAddTag = () => {
    if (currentTag.trim() !== "" && !tagsList.includes(currentTag.trim())) {
      setTagsList([...tagsList, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTagsList(tagsList.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing blog
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === editingId) {
          return {
            ...blog,
            title,
            content,
            tags: tagsList,
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
        id: blogs.length + 1,
        title,
        content,
        tags: tagsList,
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
    setTitle("");
    setContent("");
    setTagsList([]);
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setTagsList(blog.tags || []);
    setIsEditing(true);
    setEditingId(blog.id);
    setPreviewMode(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const cancelEdit = () => {
    setTitle("");
    setContent("");
    setTagsList([]);
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
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
                  <div className="border border-gray-300 rounded-md p-4 min-h-64 prose">
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
                    className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add tags"
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
              
              <div className="flex space-x-3">
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
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Your Blog Posts</h2>
            
            {blogs.length === 0 ? (
              <p className="text-gray-500">No blog posts yet.</p>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-medium text-blue-600">{blog.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                    <div className="flex space-x-2 mb-2">
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