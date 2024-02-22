import api from "../config/Api";
import { BlogPost } from "../types/models/BlogPost.model";

const BlogPostService = {
  getAllBlogPosts: () => {
    return api.get("/blog/");
  },
  getBlogPost: async (id: string): Promise<BlogPost> => {
    const { data } = await api.get<BlogPost>(`/blog/${id}`);
    return data;
  },
  addBlogPost: (blogPost: BlogPost) => {
    return api.post("/blog/", blogPost).then((res) => {
      return res.data;
    });
  },
  updateBlogPost: (blogPost: BlogPost) => {
    return api.put(`/blog/${blogPost.id}`, blogPost);
  },
  deleteBlogPost: (id: string) => {
    return api.delete(`/blog/${id}`);
  },
};

export default BlogPostService;
