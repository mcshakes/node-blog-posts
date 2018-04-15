const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = express.Router();

const {BlogPosts} = require("./models")

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

const blogPostsRouter = require("./blogPostsRouter")

app.use("/blog-posts", blogPostsRouter);


let server; // global server so it's the same server on 24 and 36

function runServer() {
  const port = process.env.PORT || 8080;

  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is running on port ${port}`);
      resolve(server);
    }).on("error", err => {
      reject(err)
    });
  })
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call resolve
        return;
      }
      resolve();
    })
  })
}

if (require.main === module) {
  runServer().catch(err => console.log(err));
}

// app.listen(process.env.PORT || 8080, () => {
//   console.log(`App is listening on port ${process.env.PORT || 8080}`)
// } )
