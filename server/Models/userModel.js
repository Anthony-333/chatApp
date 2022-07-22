import mongoose from "mongoose";

//User data model
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true } // timestamps = True (this will add time and date of creation)
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
