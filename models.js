const uuid = require('uuid');

function StorageException(message) {
  this.message = message;
  this.name = "StorageException";
}

const BlogPosts = {
  get: function() {
    console.log("Retrieving all Blog posts");
    return Object.keys(this.posts).map(key => this.posts[key]);
  }
}
