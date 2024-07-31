import { UserModel } from "../models/User.js";
import { SessionModel } from "../models/Session.js";
import { createHash, isValidPassword } from "../utils/AuthUtils.js";
import { config } from "dotenv";
import { v4 as uuid } from "uuid";

config();

const COOKIE_AGE = process.env.COOKIE_AGE;
const NODE_ENV = process.env.NODE_ENV;

export const removeOldSessions = async (user) => {
  await SessionModel.updateMany({ user }, { isRevoked: true });
};

const revokeSession = async (sid) => {
  const session = await SessionModel.findOne({ sid });
  if (!session) return;
  session.is_revoked = true;
  await session.save();
};

export const createSession = async (user_id, req, res) => {
  const sid = uuid();
  await removeOldSessions(user_id);
  await SessionModel.create({
    sid,
    user: user_id,
  });
  const currentDate = new Date();
  const maxAge = COOKIE_AGE * 60 * 60 * 1000;
  const expires = new Date(currentDate.getTime() + maxAge);
  return { sid, maxAge, expires };
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .json({
        details: "Email or Password is missing!",
      })
      .status(400);
  const user = await UserModel.findOne({ email });
  if (!user) return res.json({ details: "No user found!" });

  const passwordMatch = isValidPassword(user, password);

  if (!passwordMatch) return res.json({ details: "Wrong password!" });
  const { sid, expires, maxAge } = await createSession(user._id, req, res);
  res.cookie("sid", sid, {
    httpOnly: true,
    secure: NODE_ENV === "PROD",
    sameSite: NODE_ENV === "PROD" ? "none" : "lax",
    expires,
    maxAge,
  });
  res.json({ details: "Login Success!" });
};

const createUser = async (user) => {
  const { email, password, full_name } = user;
  const hash = createHash(password);
  const new_user = await UserModel.create({
    email,
    hash,
    full_name,
  });
  return new_user;
};

export const registerController = async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    if (!email || !password || !full_name)
      return res.json({ details: "Incomplete info!" }).status(400);
    const user = await UserModel.findOne({ email });
    if (user) return res.json({ details: "email already exists!" });
    await createUser({ email, password, full_name });
    res.json({ details: "Registered Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ details: "Error registering!" });
  }
};

export const logoutController = async (req, res) => {
  const { sid } = req.user;
  await revokeSession(sid);
  res.clearCookie("sid", {
    httpOnly: true,
    secure: NODE_ENV === "PROD",
    sameSite: NODE_ENV === "PROD" ? "none" : "lax",
  });
  res.send({
    details: "Logout Success!",
  });
};
