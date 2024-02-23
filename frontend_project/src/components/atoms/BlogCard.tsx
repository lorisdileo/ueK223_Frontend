import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { BlogPost } from "../../types/models/BlogPost.model";

export default function BlogCard(post: BlogPost) {
  //variation of card used for the getAll, couldn't reference it :(
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom>
            {!post.user.firstName} {!post.user.lastName}
          </Typography>
          <Typography variant="h5" component="div">
            {!post.title}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            {!post.category}
          </Typography>
          <Typography variant="body2">{!post.text}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
