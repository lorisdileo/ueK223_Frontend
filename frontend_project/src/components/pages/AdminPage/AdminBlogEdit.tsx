import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { BlogPost } from "../../../types/models/BlogPost.model";
import BlogPostService from "../../../Services/BlogPostService";
import BlogPostForm from "../../molecules/BlogPostForm/BlogPostForm";
import { useNavigate, useParams } from "react-router-dom";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

/* This class is the admin version of the BlogCreation class. 
This class also calls the BlogPostForm where it can edit existing posts or 
create new ones. Any new posts created here will be created under the admin user */

const AdminBlogEdit = () => {
  const navigate = useNavigate();
  const { blogPostId } = useParams();
  const { user } = useContext(ActiveUserContext);
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
          navigate("/blog/" + values.id);
        })
        .catch((error) => {
          console.log(error + "Can't navigate to blogs");
        });
    } else {
      BlogPostService.addBlogPost(values)
        .then(() => {
          navigate("/dashboard/" + user?.id);
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

export default AdminBlogEdit;
