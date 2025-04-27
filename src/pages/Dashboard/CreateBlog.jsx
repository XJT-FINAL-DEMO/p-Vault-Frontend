import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, Save, X, Image } from "lucide-react";
import { apiBlogPost, apiUpdateBlogPost } from "../../services/CreateBlog"; // ✅ import both
import Blog1 from "../../assets/images/blog1.jpeg";
import Blog2 from "../../assets/images/blog2.png";

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
    // Normally you'd fetch blogs from an API
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
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tagsList.includes(currentTag.trim())) {
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

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTagsList([]);
    setImage(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      tags: tagsList.join(","),
      status: "published",
      image,
    };

    try {
      if (isEditing && editingId) {
        const response = await apiUpdateBlogPost(editingId, payload);
        if (response.data.success) {
          alert("Blog post updated successfully!");
          updateBlogInList(response.data.data);
          resetForm();
        } else {
          alert("Failed to update blog post.");
        }
      } else {
        const response = await apiBlogPost(payload);
        if (response.data.success) {
          alert("Blog post created successfully!");
          addBlogToList(response.data.data);
          resetForm();
        } else {
          alert("Failed to create blog post.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const addBlogToList = (newBlog) => {
    const formattedBlog = {
      id: newBlog._id,
      title: newBlog.title,
      content: newBlog.content,
      tags: newBlog.tags.split(","),
      author: newBlog.author || "You",
      date: new Date().toLocaleDateString(),
      imageUrl: newBlog.image, // assuming backend sends image URL
    };
    setBlogs([formattedBlog, ...blogs]);
  };

  const updateBlogInList = (updatedBlog) => {
    setBlogs(blogs.map(blog => 
      blog.id === updatedBlog._id
        ? {
            ...blog,
            title: updatedBlog.title,
            content: updatedBlog.content,
            tags: updatedBlog.tags.split(","),
            imageUrl: updatedBlog.image,
          }
        : blog
    ));
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setTagsList(blog.tags || []);
    setIsEditing(true);
    setEditingId(blog.id);
    setPreviewMode(false);

    if (blog.imageUrl) {
      setImagePreview(blog.imageUrl);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const cancelEdit = () => resetForm();

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-blue-600">
        {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              {/* TITLE */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* IMAGE */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Blog Image</label>
                <div className="flex flex-col items-center">
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                  {imagePreview ? (
                    <div className="relative w-full mb-2">
                      <img src={imagePreview} alt="Preview" className="w-full max-h-80 object-cover rounded-md" />
                      <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div onClick={handleImageClick} className="w-full border-2 border-dashed p-6 rounded-md text-center cursor-pointer">
                      <Image size={40} className="text-gray-400 mx-auto" />
                      <p className="text-gray-500 mt-2">Click to upload</p>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md min-h-64"
                />
              </div>

              {/* TAGS */}
              <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
                <div className="flex">
                  <input
                    type="text"
                    id="tags"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="flex-1 p-2 border rounded-l-md"
                    placeholder="Press Enter to add"
                  />
                  <button type="button" onClick={handleAddTag} className="bg-blue-500 text-white px-4 rounded-r-md">Add</button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {tagsList.map((tag, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
                  <Save size={18} className="mr-2" />
                  {isEditing ? "Update Post" : "Publish Post"}
                </button>
                {isEditing && (
                  <button type="button" onClick={cancelEdit} className="bg-gray-300 px-4 py-2 rounded-md">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* BLOG LIST */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Your Blog Posts</h2>
            {blogs.length === 0 ? (
              <p className="text-gray-500">No blog posts yet.</p>
            ) : (
              blogs.map((blog) => (
                <div key={blog.id} className="mb-6">
                  {blog.imageUrl && (
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-32 object-cover rounded-md mb-2" />
                  )}
                  <h3 className="font-bold text-blue-600">{blog.title}</h3>
                  <p className="text-sm text-gray-500">{blog.date}</p>
                  <div className="flex gap-1 flex-wrap mt-2">
                    {blog.tags?.map((tag, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button onClick={() => handleEdit(blog)} className="text-blue-600 text-sm flex items-center">
                      <Pencil size={16} className="mr-1" /> Edit
                    </button>
                    <button onClick={() => handleDelete(blog.id)} className="text-red-600 text-sm flex items-center">
                      <Trash2 size={16} className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
