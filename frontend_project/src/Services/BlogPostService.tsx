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

  getAllBlogPostsWithPaging: (pageNum: number) => {
    return api.get(`/blog/feed/${pageNum}`);
  },

  addBlogPost: (blogPost: BlogPost) => {
    return api
      .post("/blog/", blogPost)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error + " Failed to add BlogPost");
      });
  },

  deleteBlogPostFromUser: (id: string) => {
    return api.delete(`/blog/${id}`);
  },

  updateBlogPostFromUser: (blogPost: BlogPost) => {
    return api.put(`/blog/${blogPost.id}`, blogPost);
  },

  deleteBlogPost: (id: string) => {
    return api.delete(`/blog/${id}`);
  },

  updateBlogPost: (blogPost: BlogPost) => {
    return api.put(`/blog/${blogPost.id}`);
  },
};

export default BlogPostService;
