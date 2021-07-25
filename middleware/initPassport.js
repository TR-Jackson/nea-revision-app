import passport from "../lib/passport";
import nc from "next-connect";

const init = nc().use(passport.initialize());

export default init;
