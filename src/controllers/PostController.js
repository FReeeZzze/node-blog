import PostModel from '../models/Post';

class PostController {

  index(req, res) {
    PostModel.find({}).then((posts, err) => {
      if (err) {
        return res.json({
          error: err.message
        });
      }

      return res.json(posts);
    });
  }

  create(req, res) {
    const data = req.body;

    const post = new PostModel({
      title: data.title,
      text: data.text,
      imageUrl: data.imageUrl,
    });

    post.save().then((post) => {
      return res.json(post);
    });
  }

  read(req, res) {
    PostModel.findOne({ _id: req.params.id }).then(post => {
      if (!post) {
        return res.json({ error: 'not found' });
      } else {
        return res.json(post);
      }
    });
  }

  update(req, res) {
    PostModel.findByIdAndUpdate(req.params.id, { $set: req.body },  {new: true},(err, post) => {
      if (err) {
        return res.json({
          error: err.message
        });
      }

      return res.json(post);
    });
  }

  delete(req, res) {
    PostModel.deleteOne({
      _id: req.params.id,
    }).then(post => {
      if (post) {
        return res.json({ status: 'deleted' });
      } else {
        return res.json({ status: 'error' });
      }
    });
  }
}

export default PostController;
