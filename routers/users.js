import { ModelController } from "../constrollers/users.js";
import { Router } from "express";

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router();

  //generando instancia
  const userController = new ModelController({ userModel });
  // GET --------------------------------------------

  userRouter.get("/", userController.getUsers);

  userRouter.get("/:id", userController.getUser);

  userRouter.get("/name/:firstName", userController.getUserFirstName);

  //POST -------------------------------------

  userRouter.post("/", userController.postUser);

  //DELETE ------------------------------------

  userRouter.delete("/:id", userController.deleteUser);

  //PATCH --------------------------------------

  userRouter.patch("/:id", userController.patchUser);

  return userRouter;
};
