import { UserModel } from "./models/local/User.js";
import { createApp } from "./users.js";

createApp({ userModel: UserModel });
