import { User } from "../models/User.js";

const getUsers = () => {
  return User.find({})
    .then((users) => users)
    .catch((err) => {
      console.error("No se pudo obtener los usuarios", err);
      throw err; // propagar el error
    });
};

const getUser = (id) => {
  return User.findById(id)
    .then((user) => user)
    .catch((err) => {
      console.error(`No se pudo encontrar el usuarios con id: ${id}`, err);
      throw err;
    });
};

const getUserName = (firstName) => {
  return User.find({ firstName: firstName })
    .then((user) => user)
    .catch((err) => {
      console.error(
        `Error en encontrar el usuario con nombre: ${firstName}`,
        err
      );
      throw err;
    });
};

const createUser = (user) => {
  return User.create(user)
    .then((user) => user)
    .catch((err) => {
      console.error("No se pudo crear el usuario", err);
      throw err;
    });
};

const patchUser = (id, updateData) => {
  return User.findByIdAndUpdate(id, updateData, { new: true })
    .then((user) => user)
    .catch((err) => {
      console.error("No se pudo encotrar el usuario", err);
      throw err;
    });
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id)
    .then((user) => user)
    .catch((err) => {
      console.error("Usuario no encontrado", err);
      throw err;
    });
};

export default {
  getUser,
  getUsers,
  getUserName,
  createUser,
  deleteUser,
  patchUser,
};
