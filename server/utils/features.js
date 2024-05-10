import mongoose from "mongoose";

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Chat" })
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export { connectDB };
