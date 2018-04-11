const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = express.Router();

const {BlogPosts} = require("./models")

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));


const blogPostsRouter = require("./blogPostsRouter")


app.listen(process.env.PORT || 8080, () => {
  console.log(`App is listening on port ${process.env.PORT || 8080}`)
} )
