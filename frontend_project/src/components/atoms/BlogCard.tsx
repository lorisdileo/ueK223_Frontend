import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";

export default function BlogCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom>author</Typography>
          <Typography variant="h5" component="div">
            title
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            category
          </Typography>
          <Typography variant="body2">text</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
