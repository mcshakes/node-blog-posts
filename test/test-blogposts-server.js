const chai = require("chai");
const chaiHttp = require("chai-http");

const {app, runServer, closeServer} = require("../server");
const expect = chai.expect;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

chai.use(chaiHttp);

describe("Blog Posts", function() {
  before(function() {
    return runServer();
  })

  after(function() {
    return closeServer();
  })

  it("should list the blog posts on GET", function() {
    return chai.request(app)
      .get("/blog-posts")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");

        expect(res.body.length).to.be.at.least(1);

        const expectedKeys = ["title", "content", "author"];

        res.body.forEach(function(post) {
          expect(post).to.be.a("object");
          expect(post).to.include.keys(expectedKeys);
        })
      })
  })

  it("should add a blog post on POST", function() {
    const newPost = {title: "Geese", content: "they are birds, probably", author: "Jim Peats" };

    const expectedKeys = ['id', 'publishDate'].concat(Object.keys(newPost));
    // NOTE: WHy is the above required? test fails with the commented out code

    return chai.request(app)
      .post("/blog-posts")
      .send(newPost)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.a("object");
        // expect(res.body).to.include.keys("id", "title", "content", "author", "publishDate");
        expect(res.body).to.have.all.keys(expectedKeys);
        expect(res.body.title).to.equal(newPost.title);
        expect(res.body.content).to.equal(newPost.content);
        expect(res.body.author).to.equal(newPost.author)

        // expect(res.body).to.deep.equal(Object.assign(newPost, {id: res.body.id}));
      });
  }); //End of POST

  it("should update a post on PUT", function() {
    const updateData = {
      title: "Raccoons: Geese of the Streets",
      content: "Forget geese. What about Raccoons. They are cool",
      author: "Billy Bob"
    };

    return chai.request(app)
      .get("/blog-posts")
      console.log()
      .then(function(res) {
        updateData.id = res.body[0].id;

        return chai.request(app)
          .put(`/blog-posts/${updateData.id}`)
          .send(updateData);
      })

      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.a("object");
        expect(res.body).to.deep.equal(updateData);
      });
  });
})
