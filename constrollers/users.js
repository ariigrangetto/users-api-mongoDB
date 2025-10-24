import api from "../api/users.js";
import { validatePartialUser, validateUser } from "../schemas/users.js";

const getUsers = async (req, res) => {
  const users = await api.getUsers();
  res.json({ message: "ok", users });
  // res.render("users", {
  //   title: "Usuarios",
  //   users,
  // });
};

const getUser = (req, res) => {
  const { id } = req.params;
  const user = api.getUser(id);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  // res.json({ message: "ok", user });
  res.render("user", {
    title: "Usuario",
    user,
  });
};

const getUserName = (req, res) => {
  const { firstName } = req.params;
  const user = api.getUserName(firstName);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  // res.json({ message: "ok", user });
  res.render("user", {
    title: firstName,
    user,
  });
};

//Reemplazar completamente un usuario
const postUser = (req, res) => {
  const result = validatePartialUser(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newUser = api.createUser(result.data);
  res.status(201);
  res.render("user", {
    title: "Nuevo usuario",
    user: newUser,
  });
};

//Actualizar parcialmente un usuario

const patchUser = (req, res) => {
  const { id } = req.params;
  const result = validatePartialUser(req.body);
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const updatedUser = api.patchUser(id, result.data);

  if (!updatedUser) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // res.json({ message: "ok", user: updatedUser });
  res.render("user", {
    title: "Usuario actualizado",
    user: updatedUser,
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const deletedUser = api.deleteUser(id);
  if (!deletedUser) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json({ message: "ok", user: deletedUser });
};

export default {
  getUser,
  getUsers,
  postUser,
  deleteUser,
  getUserName,
  patchUser,
};
