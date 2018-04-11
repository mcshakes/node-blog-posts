const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require("./models")

const jsonParser = bodyParser.json();
const app = express();
app.use(morgan('common'));

BlogPosts.create("How to smoke Kielbasa", "something something something", "Daud McSheigh");

app.get("/blog-posts", (req,res) => {
  res.json(BlogPosts.get());
})


app.listen(process.env.PORT || 8080, () => {
  console.log(`App is listening on port ${process.env.PORT || 8080}`)
} )
