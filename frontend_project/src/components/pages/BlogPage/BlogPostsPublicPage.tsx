import React from "react";
import { useEffect, useState } from "react";
import { BlogPost } from "../../../types/models/BlogPost.model";
import BlogPostService from "../../../Services/BlogPostService";
import { Button, Card, CardActionArea, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardContent } from "@mui/joy";

const BlogPostsPublicPage = () => {
  const [blopPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const postsPerPage = 5;
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    BlogPostService.getAllBlogPosts()
      .then((data) => {
        const sortedPosts = data.data.sort((a: any, b: any) => {
          if (sortOrder === "asc") {
            return a[sortBy] < b[sortBy] ? -1 : 1;
          } else {
            return a[sortBy] > b[sortBy] ? -1 : 1;
          }
        });

        const slicedPosts = sortedPosts.slice(startIndex, endIndex);
        setBlogPosts(slicedPosts);
        console.log(slicedPosts);
      })
      .catch((error) => {
        console.log(error + " Can't sort BlogPosts");
      });
  }, [page, postsPerPage, sortBy, sortOrder]);

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleClick = (blogPostId: string) => {
    navigate("../blog/" + blogPostId);
  };

  return (
    <div>
      <div>
        Sort by:
        <button onClick={() => handleSortChange("title")}>Title</button>
      </div>
      {blopPosts.map((blogPost) => (
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
        <Button onClick={() => setPage(page - 1)}>{"<"}</Button>
        {page}
        <Button onClick={() => setPage(page + 1)}>{">"}</Button>
      </div>
    </div>
  );
};

export default BlogPostsPublicPage;
