import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "../../../types/models/BlogPost.model";
import BlogPostService from "../../../Services/BlogPostService";
import { CardContent } from "@mui/joy";
import { Button, Card, CardActions } from "@mui/material";

const BlogPostTable = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  //Only the users own posts should be shown
  useEffect(() => {
    BlogPostService.getAllBlogPosts()
      .then((data) => {
        const userBlogPosts = data.data.filter(
          (blogPost: BlogPost) => blogPost.user.id === user.id
        );
        setBlogPosts(userBlogPosts);
      })
      .catch((error) => {
        console.log(error + "Can't get BlogPosts");
      });
  }, [user.id]);

  const handleAdd = () => {
    navigate("../blogadd/");
  };

  const handleEdit = (blogPostId: string) => {
    navigate("../blogedit/" + blogPostId);
  };

  const handleDelete = (blogPostId: string) => {
    BlogPostService.deleteBlogPost(blogPostId).then(() =>
      setBlogPosts(
        blogPosts.filter((blogPost: BlogPost) => blogPost.id !== blogPostId)
      )
    );
  };

  return (
    <>
      {blogPosts.map((blogPost) => (
        <div key={blogPost.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {blogPost.title} {blogPost.text}
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleEdit(blogPost.id)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => {
                    handleDelete(blogPost.id);
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      ))}
      <Button
        size="small"
        color="success"
        variant="contained"
        onClick={handleAdd}
      >
        Add
      </Button>
    </>
  );
};

export default BlogPostTable;
