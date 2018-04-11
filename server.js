const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require("./models")

const jsonParser = bodyParser.json();
const app = express();
app.use(morgan('common'));

BlogPosts.create("How to smoke Kielbasa", "All in the rub, baby. For the heat level is the end game", "Daud McSheigh");
BlogPosts.create("Capitalism Reimagined", "Greed is good", "Shania Twilip");
BlogPosts.create("Stop Reading", "Books are evil: change my mind", "Gilbert Melendez");

app.get("/blog-posts", (req,res) => {
  res.json(BlogPosts.get());
})

app.post("/blog-posts", jsonParser, (req, res) => {
  const requiredFields = ["title", "content", "author"];

  for (let i = 0; i <requiredFields.length; i++) {
    const field = requiredFields[i];

    if (!(field in req.body)) {
      let message = `Missing \`${field}\` in request body`
      console.error(mesage);
      return res.status(400).send(message);
    }
  }

  const blogPost = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(blogPost);
})


app.listen(process.env.PORT || 8080, () => {
  console.log(`App is listening on port ${process.env.PORT || 8080}`)
} )
