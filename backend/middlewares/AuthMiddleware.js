import { SessionModel } from "../models/Session.js";

export const verifySesssion = async (req, res, next) => {
  const sid = req.cookies.sid;
  const session = await SessionModel.findOne({ sid, isRevoked: false });
  // Validate session expiry
  if (session) {
    console.log("session verified");
    req.user = session;
    next();
  } else {
    console.log("session failed");
    return res.status(401).send();
  }
};
