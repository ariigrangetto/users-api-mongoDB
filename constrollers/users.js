import api from "../api/users.js";
import { validatePartialUser, validateUser } from "../schemas/users.js";

const getUsers = (req, res) => {
  api
    .getUsers()
    .then((users) => {
      res.status(201).json({ message: "ok", users });
    })
    .catch((err) => {
      res
        .status(500) //error del servidor
        .json({ message: "Error interno del servidor", error: err.message });
    });

  // res.render("users", {
  //   title: "Usuarios",
  //   users,
  // });
};

const getUser = (req, res) => {
  const { id } = req.params;
  api
    .getUser(id)
    .then((user) => {
      res.status(201).json({ message: "ok", user });
    })
    .catch((err) => {
      res
        .status(404) //not found
        .json({ message: "Usuario no encontrado", error: err.message });
    });
  // res.render("user", {
  //   title: "Usuario",
  //   user,
  // });
};

const getUserName = (req, res) => {
  const { firstName } = req.params;
  api
    .getUserName(firstName)
    .then((user) => {
      res.status(201).json({ message: "ok", user });
    })
    .catch((err) => {
      res
        .status(404) //not found
        .json({ message: "Usuario no encontrado", error: err.message });
    });

  // res.render("user", {
  //   title: firstName,
  //   user,
  // });
};

//Crear completamente un usuario
const postUser = (req, res) => {
  const result = validateUser(req.body);

  if (!result.success) {
    //bad request
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  api
    .createUser(result.data)
    .then((user) => {
      res.status(201).json({ message: "ok", user });
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "Usuario no pudo ser creado", error: err.message });
    });
  // res.render("user", {
  //   title: "Nuevo usuario",
  //   user: newUser,
  // });
};

//Actualizar parcialmente un usuario

const patchUser = (req, res) => {
  const { id } = req.params;
  const result = validatePartialUser(req.body);

  if (!result.success) {
    //bad request
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  api
    .patchUser(id, result.data)
    .then((user) => {
      res.status(201).json({ message: "ok", user });
    })
    .catch((err) => {
      //json no recive segundo parametro
      res.status(404).json({
        message: "Usuario no pudo ser modificado",
        error: err.message,
      });
    });

  // res.json({ message: "ok", user: updatedUser });
  // res.render("user", {
  //   title: "Usuario actualizado",
  //   user: updatedUser,
  // });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  api
    .deleteUser(id)
    .then((user) => {
      res.status(201).json({ message: "ok", user });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Usuario no puede ser eliminado",
        error: err.message,
      });
    });
};

export default {
  getUser,
  getUsers,
  postUser,
  deleteUser,
  getUserName,
  patchUser,
};
