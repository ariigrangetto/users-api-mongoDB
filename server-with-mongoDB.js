import { UserModel } from "./models/mongoose/User.js";
import { createApp } from "./users.js";

createApp({ userModel: UserModel });
