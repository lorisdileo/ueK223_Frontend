import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "../../../types/models/BlogPost.model";
import BlogPostService from "../../../Services/BlogPostService";
import { CardContent } from "@mui/joy";
import { Button, Card, CardActions } from "@mui/material";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

/* Page for the currently logged in user to see their own posts.
The user is able to create, update and delete blog posts here */

const BlogListOfUser = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { user } = useContext(ActiveUserContext);

  /* Using 'ActiveUserContext' to define the currently logged in user. 
  The getAllBlogPosts method gets called and is afterwards filtered 
  to only display blogs where the author id matches the id of the currently 
  logged in user*/
  useEffect(() => {
    BlogPostService.getAllBlogPosts()
      .then((data) => {
        const userBlogPosts = data.data.filter(
          (blogPost: BlogPost) => blogPost.user.id === user?.id
        );
        setBlogPosts(userBlogPosts);
      })
      .catch((error) => {
        console.log(error + "Can't get BlogPosts");
      });
  }, [user?.id]);

  const handleAdd = () => {
    navigate("../createBlog");
  };

  const handleBack = () => {
    navigate("../home");
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
        sx={{ margin: 1 }}
        size="small"
        color="success"
        variant="contained"
        onClick={handleAdd}
      >
        Add
      </Button>
      <Button
        size="small"
        color="primary"
        variant="contained"
        onClick={handleBack}
      >
        Go back
      </Button>
    </>
  );
};

export default BlogListOfUser;
