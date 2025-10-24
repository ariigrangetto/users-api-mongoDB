import { Schema, model } from "mongoose";
import users from "../users.json" with { type: "json" };

const usersSchema = new Schema({
  firstName: String,
  lastName: String,
  maidenName: String,
  age: Number,
  gender: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  birthDate: String,
  image: String,
  bloodGroup: String,
  height: Number,
  weight: Number,
  eyeColor: String,
  hair: {
    type:{
        color: String,
        type: String,
    }
  },
  ip: String,
  address: {
    address: String,
    city: String,
    state: String,
    stateCode: String,
    postalCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
    country: String,
  },
  macAddress: String,
  university: String,
  bank: {
    cardExpire: String,
    cardNumber: String,
    cardType: String,
    currency: String,
    iban: String,
  },
  company: {
    department: String,
    name: String,
    title: String,
    address: {
      address: String,
      city: String,
      state: String,
      stateCode: String,
      postalCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      country: String,
    },
  },
  ein: String,
  ssn: String,
  userAgent: String,
  crypto: {
    coin: String,
    wallet: String,
    network: String,
  },
  role: String,
});

usersSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const User = model("User", usersSchema);
//El primer parametro tiene que ser singular ya que automaticamente pasa a ser plural

const insertUsers = async () => {
    try{
        const result = await User.insertMany(users);
        console.log(`${result.length} usuarios insertados`);
    } catch(err){
        console.error(`Error al insertar los usuarios`, err);
    }
}

// const resetUsers = async() =>{
//   try{
//     await User.deleteMany();
//     console.log("Coleccion reiniciada");
//   }catch(err){
//     console.log(err);
//   }
// }

// resetUsers();

insertUsers();