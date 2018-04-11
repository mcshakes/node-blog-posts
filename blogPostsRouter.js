const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const {BlogPosts} = require("./models")
const jsonParser = bodyParser.json();

BlogPosts.create("How to smoke Kielbasa", "All in the rub, baby. For the heat level is the end game", "Daud McSheigh");
BlogPosts.create("Capitalism Reimagined", "Greed is good", "Shania Twilip");
BlogPosts.create("Stop Reading", "Books are evil: change my mind", "Gilbert Melendez");

router.get("/", (req,res) => {
  res.json(BlogPosts.get());
})

router.post("/", jsonParser, (req, res) => {
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

router.put('/:id', jsonParser, (req, res) => {
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

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});
// DELETE block

module.exports = router;
