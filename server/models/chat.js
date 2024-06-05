import mongoose, { Schema, Types, model } from "mongoose";

// Define the schema
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    members: {
      type: [
        {
          type: Types.ObjectId,
          ref: "User",
        },
      ],
      default: [], // Ensure default value is an empty array
      validate: {
        validator: function (v) {
          // Ensure all elements in the array are valid ObjectIds
          return (
            Array.isArray(v) && v.every((id) => Types.ObjectId.isValid(id))
          );
        },
        message: (props) => `${props.value} is not a valid ObjectId array!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
export const Chat = mongoose.models.Chat || model("Chat", schema);
