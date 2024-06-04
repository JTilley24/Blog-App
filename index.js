import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var blogs = [];
var blogIndex;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { blogsList : blogs });
  });

//Create new blog post and add to array
app.post("/submit", (req, res) => {
    const newBlog = new Object();
    newBlog.name = req.body["userName"];
    newBlog.title = req.body["blogTitle"];
    newBlog.blogText = req.body["blogText"];
    blogs.push(newBlog);
    res.render("index.ejs", { blogsList : blogs });
});

//Pass to create view
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

//Get selected blog and pass to view
app.get("/blog/:id", (req, res) => {
  console.log(req.params.id);
  blogIndex = req.params.id;
  res.render("blog.ejs", {blogNumber : blogIndex, blogsList : blogs});
});

//Select blog and pass to edit view
app.get("/blog/edit/:id", (req, res) => {
  blogIndex = req.params.id;
  res.render("edit.ejs", {blogNumber : blogIndex, blogsList : blogs});
});

//Select blog and confirm delete
app.get("/blog/delete/:id", (req, res) => {
  blogIndex = req.params.id;
  res.render("delete.ejs", {blogNumber : blogIndex, blogsList : blogs});
});

//Replace blog with edited
app.post("/blog/edit/submit/:id", (req, res) => {
  blogIndex = req.params.id;
  const editBlog = blogs[blogIndex];
  editBlog.name = req.body["userNameEdit"];
  editBlog.title = req.body["blogTitleEdit"];
  editBlog.blogText = req.body["blogTextEdit"];
  blogs[blogIndex] = editBlog;
  res.render("index.ejs", { blogsList : blogs });
});

//Remove blog from array
app.post("/blog/delete/submit/:id", (req, res) => {
  if(req.body.YES){
    blogIndex = req.params.id;
    blogs.splice(blogIndex, 1);
  }
  res.render("index.ejs", { blogsList : blogs });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  