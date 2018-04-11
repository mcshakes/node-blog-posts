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
// End of POST block

app.put('/blog-posts/:id', jsonParser, (req, res) => {
  const requiredFields = ["title", "content", "author"];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post : \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.params.title,
    content: req.body.content,
    author: req.body.author
  });
  res.status(204).end();
});
// End of PUT block

app.delete('/blog-posts/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});
// DELETE block

app.listen(process.env.PORT || 8080, () => {
  console.log(`App is listening on port ${process.env.PORT || 8080}`)
} )
