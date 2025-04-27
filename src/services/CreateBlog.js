import { apiClient } from "./config";

// Create a new blog post
export const apiBlogPost = async (payload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  formData.append("tags", payload.tags);
  formData.append("status", payload.status);
  formData.append("image", payload.image); // image is a File object

  return apiClient.post("/api/blogs", formData, {
    headers: {
      // No need to manually set 'Content-Type'; Axios handles it
    },
  });
};

// Update an existing blog post
export const apiUpdateBlogPost = async (id, payload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  if (payload.image) {
    formData.append("image", payload.image);
  }

  return apiClient.patch(`/api/blog/${id}`, formData, {
    headers: {
      // Again, Axios automatically sets correct headers for FormData
    },
  });
};
