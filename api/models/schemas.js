import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

// User Schema
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  posts: [{ type: Types.ObjectId, ref: "Post" }],
  savedPosts: [{ type: Types.ObjectId, ref: "SavedPost" }],
  chats: [{ type: Types.ObjectId, ref: "Chat" }],
});

const User = model("User", userSchema);

// // Post Schema
// const postSchema = new Schema({
//   title: { type: String, required: true },
//   price: { type: Number, required: true },
//   images: [{ type: String }],
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   bedroom: { type: Number, required: true },
//   bathroom: { type: Number, required: true },
//   latitude: { type: String, required: true },
//   longitude: { type: String, required: true },
//   type: { type: String, 
// enum: ["buy", "rent"], required: true },
//   property: { type: String, enum: ["apartment", "house", "condo", "land"], required: true },
//   createdAt: { type: Date, default: Date.now },
//   user: { type: Types.ObjectId, ref: "User", required: true },
//   postDetail: { type: Types.ObjectId, ref: "PostDetail" },
//   savedPosts: [{ type: Types.ObjectId, ref: "SavedPost" }],
// });

// const Post = model("Post", postSchema);
// Saved Post Schema
// const savedPostSchema = new Schema({
//   user: { type: Types.ObjectId, ref: "User", required: true },
//   post: { type: Types.ObjectId, ref: "Post", required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// savedPostSchema.index({ user: 1, post: 1 }, { unique: true });

// const SavedPost = model("SavedPost", savedPostSchema);

// Chat Schema
const chatSchema = new Schema({
  users: [{ type: Types.ObjectId, ref: "User", required: true }],
  createdAt: { type: Date, default: Date.now },
  seenBy: [{ type: Types.ObjectId, ref: "User" }],
  messages: [{ type: Types.ObjectId, ref: "Message" }],
  lastMessage: { type: String },
});

const Chat = model("Chat", chatSchema);

// Message Schema
const messageSchema = new Schema({
  text: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User", required: true },
  chat: { type: Types.ObjectId, ref: "Chat", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = model("Message", messageSchema);

export default User;
