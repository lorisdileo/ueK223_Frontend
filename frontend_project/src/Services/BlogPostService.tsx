import api from "../config/Api";
import { BlogPost } from "../types/models/BlogPost.model";

const BlogPostService = {
  getBlogPost: async (id: string): Promise<BlogPost> => {
    const { data } = await api.get<BlogPost>(`/blog/detailed-view/${id}`);
    return data;
  },

  getAllBlogPosts: () => {
    return api.get(`/blog/feed`);
  },

  getAllBlogPostsWithPaging: async (pageNum: number): Promise<BlogPost[]> => {
    const { data } = await api.get(`/blog/feed/${pageNum}`);
    return data;
  },

  addBlogPost: (blogPost: BlogPost) => {
    return api.post("/blog/", blogPost).then((res) => {
      return res.data;
    });
  },

  deleteBlogPost: (id: string) => {
    return api.delete(`/blog/${id}`);
  },

  updateBlogPost: (blogPost: BlogPost) => {
    return api.put(`/blog/${blogPost.id}`, blogPost);
  },
};

export default BlogPostService;
