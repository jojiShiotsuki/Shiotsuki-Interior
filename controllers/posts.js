const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("addProject.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ formattedDate: "asc" }).lean();
      const postsForFeed = await Post.find({ user: req.user.id });
      // Format the time property in each post
      posts.forEach(post => {
        if (post.time instanceof Date) {
          // Format the time as "15:43pm"
          post.formattedTime = post.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        }
        if (post.assignedDate instanceof Date) {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          post.formattedDate = post.assignedDate.toLocaleDateString('en-US', options);
        }
      });
  
      res.render("feed.ejs", { posts: posts, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
        if (post.time instanceof Date) {
          // Format the time as "15:43pm"
          post.formattedTime = post.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        }
        if (post.assignedDate instanceof Date) {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          post.formattedDate = post.assignedDate.toLocaleDateString('en-US', options);
        }
      res.render("post.ejs", { post: post, user: req.user, comments: comments});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      const timeString = req.body.time;
      let time = null;

      if (timeString) {
        // Split the time string into hours and minutes
        const [hours, minutes] = timeString.split(':').map(Number);

        // Create a Date object with a default date and the specified time
        time = new Date(2000, 0, 1, hours, minutes);
      }

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        status: req.body.status,
        time: time,
        assignedDate: req.body.assignedDate,
        address: req.body.address,
      });
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updateStatus: async (req, res) => {
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { status: req.body.status },
        { new: true } // This option returns the updated document
      );
  
      console.log("Status updated:", updatedPost.status);
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updateTime: async (req, res) => {
    try {
      // Convert the time string to a Date object
      const time = new Date(`2000-01-01T${req.body.time}`);
  
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { time: time },
        { new: true } // This option returns the updated document
      );
  
      console.log("Time updated:", updatedPost.time);
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  updateDate: async (req, res) => {
    try {
      // Convert the time string to a Date object
      const date = req.body.assignedDate ? new Date(req.body.assignedDate) : undefined;
  
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { assignedDate: date },
        { new: true } // This option returns the updated document
      );
  
      console.log("Date updated:", updatedPost.assignedDate);
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  
  
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/feed");
    } catch (err) {
      res.redirect("/feed");
    }
  },
};
