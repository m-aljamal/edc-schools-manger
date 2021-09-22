import { nanoid } from "nanoid";
import { Db } from "mongodb";
import jwt from "jsonwebtoken";

export const createUser = async (
  db: Db,
  user: { name: string; email: string; password: string; isAdmin: boolean }
) => {
  const newUser = await db
    .collection("users")
    .insertOne({
      _id: nanoid(),
      ...user,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0]);

  return newUser;
};
export const getUsers = async (db: Db) => {
  return db.collection("users").find({}).toArray();
};

export const getUser = async (db: Db, id: string) => {
  return db.collection("users").findOne({ _id: id });
};

export const loginUser = async (
  db: Db,
  collection: string,
  user: { email: string; password: string }
) => {
  return await db
    .collection(collection)
    .findOne({ email: user.email, password: user.password });
};

export const getLogedUser = async (db: Db, token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const collection = decoded.type  ? "employee" : "users";
    return db.collection(collection).findOne({ _id: decoded.id });
  } catch (error) {
    return false;
  }
};
