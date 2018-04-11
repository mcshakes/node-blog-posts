const express = require("express");
const app = express();

const BlogPosts = require("./models")
// GET and POST requests should go to /blog-posts

BlogPosts.create("How to smoke Kielbasa", "something something something", "Daud McSheigh", );

app.get("/blog-posts", (req,res) => {
  res.json(BlogPosts.get());
})


app.listen(process.env.PORT || 8080, () => {
  console.log(`App is listening on port ${process.env.PORT || 8080}`)
} )
