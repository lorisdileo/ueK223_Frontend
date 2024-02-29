import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "../../../types/models/BlogPost.model";
import BlogPostService from "../../../Services/BlogPostService";
import { CardContent } from "@mui/joy";
import { Button, Card, CardActions } from "@mui/material";

/* Listing of all created blogs from all users. The admin can update 
and delete existing blogs or create new ones under the admin user */

const AdminBlogList = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    BlogPostService.getAllBlogPosts()
      .then((data) => {
        setBlogPosts(data.data);
      })
      .catch((error) => {
        console.log(error + "failed to get all blog posts");
      });
  }, []);

  const handleAdd = () => {
    navigate("/createBlog");
  };

  const handleEdit = (blogPostId: string) => {
    navigate("/adminedit/" + blogPostId);
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

export default AdminBlogList;
