//import module and dependencies
import UserModel from "../Models/userModel.js";
import bcrypt, { hash } from "bcrypt";

//get User from database
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    //get user using id in the req
    const user = await UserModel.findById(id);

    //once user exist separate password from the details
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//update user from database
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, password } = req.body;

  //if password is present in req body
  if (password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
  }

  if (id === currentUserId) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied");
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  //if current user id is equal to id wish to delete
  //then perform delete func.
  if (currentUserId === id) {
    try {
      await UserModel.findByIdAndDelete(id)
      res.status(200).json("User Deleted Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! You can only delete your own account");
  }
};
