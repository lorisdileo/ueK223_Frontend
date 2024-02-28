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
  const [page, setPage] = useState(1);
  const postsPerPage = 5;
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    BlogPostService.getAllBlogPosts()
      .then((data) => {
        /*using .sort() the titles are sorted either by asc or desc. 
        In the case of being sorted by ascending order, if a < b, 
        -1 is returned indicating that a should be before b. */
        const sortedPosts = data.data.sort((a: any, b: any) => {
          if (sortOrder === "asc") {
            return a.title < b.title ? -1 : 1;
          } else {
            return a.title > b.title ? -1 : 1;
          }
        });

        /* Splits the posts up into pages using the variable 
        postsPerPage to define how much get displayed. */
        const slicedPosts = sortedPosts.slice(startIndex, endIndex);
        setBlogPosts(slicedPosts);
      })
      .catch((error) => {
        console.log(error + " Can't sort BlogPosts");
      });
  }, [page, postsPerPage, sortOrder]);

  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
        <Button onClick={() => setPage(page - 1)}>{"<"}</Button>
        {page}
        <Button onClick={() => setPage(page + 1)}>{">"}</Button>
      </div>
    </div>
  );
};

export default BlogList;
