import React from "react";
import { useEffect, useState } from "react";
import { BlogPost } from "../../../types/models/BlogPost.model";
import BlogPostService from "../../../Services/BlogPostService";
import BlogPostForm from "../../molecules/BlogPostForm/BlogPostForm";
import { useNavigate, useParams } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const { blogPostId } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost>({
    id: "",
    title: "",
    text: "",
    user: { id: "", firstName: "", lastName: "", email: "", roles: [] },
    category: "",
  });

  useEffect(() => {
    return () => {
      if (blogPostId) {
        BlogPostService.getBlogPost(blogPostId)
          .then((res) => {
            return setBlogPost(res);
          })
          .catch((error) => {
            console.log(error + "Can't get BlogPost");
          });
      }
    };
  }, [blogPostId]);

  const submitActionHandler = (values: BlogPost) => {
    if (blogPostId !== undefined) {
      BlogPostService.updateBlogPost(values)
        .then(() => {
          navigate("../blogs");
        })
        .catch((error) => {
          console.log(error + "Can't navigate to blogs");
        });
    } else {
      BlogPostService.addBlogPost(values)
        .then(() => {
          navigate("/blogs");
        })
        .catch((error) => {
          console.log(error + "Can't navigate to blogs");
        });
    }
  };

  return (
    <BlogPostForm
      blogPost={blogPost}
      submitActionHandler={submitActionHandler}
    />
  );
};

export default AdminPage;
