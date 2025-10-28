import { validatePartialUser, validateUser } from "../schemas/users.js";

export class ModelController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getUsers = async (req, res) => {
    const users = await this.userModel.getUsers();
    if (!users) {
      return res
        .status(500) //error del servidor
        .json({ message: "internal service error" });
    }
    // res.render("users", {
    //   title: "Usuarios",
    //   users,
    // });
    return res.status(200).json({ message: "ok", users });
  };
  getUser = async (req, res) => {
    const { id } = req.params;
    const user = await this.userModel.getUser(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "ok", user });
  };

  getUserFirstName = async (req, res) => {
    const { firstName } = req.params;
    const user = await this.userModel.getUserName(firstName);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "ok", user });
  };

  postUser = async (req, res) => {
    const result = validateUser(req.body);

    if (!result.success) {
      //bad request
      return res.status(400).json({ error: result.error.message });
    }

    const postedUser = await this.userModel.createUser(result.data);

    if (!postedUser) {
      return res.status(404).json({ message: "User cannot be created" });
    }
    return res.status(201).json({ message: "ok", user: postedUser });
  };

  patchUser = async (req, res) => {
    const { id } = req.params;
    const result = validatePartialUser(req.body);

    if (!result.success) {
      //bad request
      return res.status(400).json({ error: result.error.message });
    }

    const updatedUser = await this.userModel.patchUser(id, result.data);
    if (!updatedUser) {
      res.status(404).json({
        message: "User cannot be modified",
      });
    }
    return res.status(200).json({ message: "ok", user: updatedUser });
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;

    const userDeleted = await this.userModel.deleteUser(id);

    if (!userDeleted) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ message: "ok", user: userDeleted });
  };
}

// const getUsers = (req, res) => {
//   api
//     .getUsers()
//     .then((users) => {
//       res.status(201).json({ message: "ok", users });
//     })
//     .catch((err) => {
//       res
//         .status(500) //error del servidor
//         .json({ message: "internal service error", error: err.message });
//     });

//   // res.render("users", {
//   //   title: "Usuarios",
//   //   users,
//   // });
// };

// const getUser = (req, res) => {
//   const { id } = req.params;
//   api
//     .getUser(id)
//     .then((user) => {
//       res.status(201).json({ message: "ok", user });
//     })
//     .catch((err) => {
//       res.status(404).json({ message: "User not found", error: err.message });
//     });
//   // res.render("user", {
//   //   title: "Usuario",
//   //   user,
//   // });
// };

// const getUserName = (req, res) => {
//   const { firstName } = req.params;
//   api
//     .getUserName(firstName)
//     .then((user) => {
//       res.status(201).json({ message: "ok", user });
//     })
//     .catch((err) => {
//       res.status(404).json({ message: "User not found", error: err.message });
//     });

//   // res.render("user", {
//   //   title: firstName,
//   //   user,
//   // });
// };

// //Crear completamente un usuario
// const postUser = (req, res) => {
//   const result = validateUser(req.body);

//   if (!result.success) {
//     //bad request
//     return res.status(400).json({ error: JSON.parse(result.error.message) });
//   }

//   api
//     .createUser(result.data)
//     .then((user) => {
//       res.status(201).json({ message: "ok", user });
//     })
//     .catch((err) => {
//       res
//         .status(404)
//         .json({ message: "User cannot be created", error: err.message });
//     });
//   // res.render("user", {
//   //   title: "Nuevo usuario",
//   //   user: newUser,
//   // });
// };

// const patchUser = (req, res) => {
//   const { id } = req.params;
//   const result = validatePartialUser(req.body);

//   if (!result.success) {
//     //bad request
//     return res.status(400).json({ error: JSON.parse(result.error.message) });
//   }

//   api
//     .patchUser(id, result.data)
//     .then((user) => {
//       res.status(201).json({ message: "ok", user });
//     })
//     .catch((err) => {
//       res.status(404).json({
//         message: "User cannot be modified",
//         error: err.message,
//       });
//     });

//   // res.json({ message: "ok", user: updatedUser });
//   // res.render("user", {
//   //   title: "Usuario actualizado",
//   //   user: updatedUser,
//   // });
// };

// const deleteUser = (req, res) => {
//   const { id } = req.params;
//   api
//     .deleteUser(id)
//     .then((user) => {
//       res.status(201).json({ message: "ok", user });
//     })
//     .catch((err) => {
//       res.status(404).json({
//         message: "User cannot be deleted",
//         error: err.message,
//       });
//     });
// };
