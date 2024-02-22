import React, { useEffect, useState } from "react";
import { BlogPost } from "../../../types/models/BlogPost.model";
import BlogPostService from "../../../Services/BlogPostService";
import Card from "@mui/joy/Card/Card";
import CardContent from "@mui/joy/CardContent/CardContent";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import BlogCard from "../../atoms/BlogCard";

const BlogPostPublicPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { blogPostId } = useParams();

  useEffect(() => {
    if (blogPostId) {
      console.log(blogPostId);
      BlogPostService.getBlogPost(blogPostId).then((data) => {
        if (data) {
          setBlogPosts([data]);
        }
      });
    }
  }, [blogPostId]);

  return (
    <>
      {" "}
      <div>IT WORKS</div>
      {blogPosts.map((item) => (
        <BlogCard
          id={item.id}
          title={item.title}
          text={item.text}
          user={{
            id: item.user.id,
            email: item.user.email,
            firstName: item.user.firstName,
            lastName: item.user.lastName,
            roles: item.user.roles,
          }}
          category={item.category}
        />
      ))}
    </>
  );
};

export default BlogPostPublicPage;
