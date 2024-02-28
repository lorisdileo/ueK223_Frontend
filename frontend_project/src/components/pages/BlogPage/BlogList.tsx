import React from "react";
import { useEffect, useState } from "react";
import { BlogPost } from "../../../types/models/BlogPost.model";
import BlogPostService from "../../../Services/BlogPostService";
import { Button, Card, CardActionArea, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardContent } from "@mui/joy";

/* Method to get all existing blog posts. Blogs displayed here cannot be modified.
This page also implements paging and sorting */

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  useEffect(() => {
    BlogPostService.getAllBlogPostsWithPaging(page)
      .then((data) => {
        setBlogPosts(data);
      })
      .catch((error) => {
        console.log(error + " Can't sort BlogPosts");
      });
  }, [page]);

  //reverses the current sort method (asc -> desc or desc -> asc)
  const handleSortChange = () => {
    setBlogPosts([...blogPosts].reverse());
  };

  const handleClick = (blogPostId: string) => {
    navigate("../blog/" + blogPostId);
  };

  return (
    <div>
      <div>
        Sort by:
        <button onClick={handleSortChange}>Title</button>
      </div>
      {blogPosts.map((blogPost) => (
        <div key={blogPost.id}>
          <Card sx={{ minWidth: 275 }} onClick={() => handleClick(blogPost.id)}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom>
                  {blogPost.user.firstName} {blogPost.user.lastName}
                </Typography>
                <Typography variant="h5" component="div">
                  {blogPost.title}
                </Typography>
                <Typography
                  sx={{ mb: 1.5, fontSize: 14 }}
                  color="text.secondary"
                >
                  {blogPost.category}
                </Typography>
                <Typography variant="body2">{blogPost.text}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}

      {/* Buttons for Pagination */}
      <div>
        <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
          {"<"}
        </Button>
        {page + 1}
        <Button onClick={() => setPage(page + 1)}>{">"}</Button>
      </div>
    </div>
  );
};

export default BlogList;
