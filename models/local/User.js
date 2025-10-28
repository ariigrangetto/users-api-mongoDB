import users from "../../users.json" with {type: "json"};

export class UserModel {
  static getUsers = () => {
    return users;
  };
  static getUser = (id) => {
    return users.find((user) => user.id === parseInt(id));
  };

  static getUserName = (firstName) => {
    return users.find(
      (user) =>
        user.firstName.toLocaleLowerCase() === firstName.toLocaleLowerCase()
    );
  };

  static createUser = (user) => {
    const lastIndex =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    user.id = lastIndex;
    users.push(user);
    return user;
  };

  static patchUser = (id, updateData) => {
    const findIndex = users.findIndex((user) => user.id === parseInt(id));
    if (findIndex === -1) return null;
    users[findIndex] = {
      ...users[findIndex], 
      ...updateData,
      id: users[findIndex].id,
    };

    return users[findIndex];
  };

  static deleteUser = (id) => {
    const findIndex = users.findIndex((user) => user.id === parseInt(id));
    if (findIndex === -1) return null;
    const user = users.splice(findIndex, 1)[0];
    return user;
  };
}
