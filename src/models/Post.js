import mongoose, {Schema} from 'mongoose';
import moment from 'moment-timezone';

const PostSchema = new Schema(
  {
    title: String,
    text: String,
    imageUrl: String,
    createdAt: {
      type: String,
    },
    updatedAt: {
      type: String,
    }
  },
);

PostSchema.pre('save', function () {
  const now = moment();
  now.tz('UTC').format();
  const dateKiev = now.tz("Europe/Kiev").format("YYYY/MM/DD ddd, hh:mm A");
  this.updatedAt = dateKiev;
  if ( !this.createdAt ) {
    this.createdAt = dateKiev;
  }
});

PostSchema.pre('findOneAndUpdate', function (next)  {
  const now = moment();
  now.tz('UTC').format();
  this._update.updatedAt = now.tz("Europe/Kiev").format("YYYY/MM/DD ddd, hh:mm A");
  next();
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
