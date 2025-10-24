import { User } from "../models/User.js";

const getUsers = async () => {
  const users = await User.find();
  return users;
};

const getUser = (id) => {
  return users.find((user) => user.id === parseInt(id));
};

const getUserName = (firstName) => {
  return users.find(
    (user) =>
      user.firstName.toLocaleLowerCase() === firstName.toLocaleLowerCase()
  );
};

const createUser = (user) => {
  //users.map recorre todo el array de users y devuelve los id pero separados por , para que Math.max pueda utilizarlo. Sino daria null al usar []. Map devuelve un nuevo array, no modifica el anterior.
  //el math.max obtiene el numero mayor y luego lo suma 1. De esta forma se puede agregar un id nuevo con un id + 1 al anterior.
  //primero se ejecuta el map y como me devuelve un nuevo array y tengo que pasarlo a string para que el Math.max me lo tome, uso el ...
  //Math.max tambien transforma strings a numbers
  //el ... "desempaqueta" el array
  //copiar arrays [...];
  //desempaquetar elementos (...)
  const lastIndex =
    users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  user.id = lastIndex;
  users.push(user);
  return user;
};

const patchUser = (id, updateData) => {
  const findIndex = users.findIndex((user) => user.id === parseInt(id));
  if (findIndex === -1) return null;
  users[findIndex] = {
    ...users[findIndex], //mantener los datos existentes
    ...updateData, //Sobreescribit con los nuevos datos
    id: users[findIndex].id,
  };

  return users[findIndex];
};

const deleteUser = (id) => {
  const findIndex = users.findIndex((user) => user.id === parseInt(id));
  if (findIndex === -1) return null;
  const user = users.splice(findIndex, 1)[0];
  return user;
};

export default {
  getUser,
  getUsers,
  getUserName,
  createUser,
  deleteUser,
  patchUser,
};
