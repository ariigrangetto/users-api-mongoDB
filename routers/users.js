import express from "express";
import controlles from "../constrollers/users.js";
const router = express.Router();
import "dotenv/config";

// GET --------------------------------------------

router.get("/", controlles.getUsers);

router.get("/:id", controlles.getUser);

router.get("/name/:firstName", controlles.getUserName);

//POST -------------------------------------

router.post("/", controlles.postUser);

//DELETE ------------------------------------

router.delete("/:id", controlles.deleteUser);

//PATCH --------------------------------------

router.patch("/:id", controlles.patchUser);

export default router;
