import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import { checkAuthError, checkAuthorised } from "../../../util/errors";
import Folder from "../../../models/Folder";

const handler = nextConnect()
  .use(passport.initialize())
  .get((req, res) => {
    passport.authenticate(
      "local-jwt",
      { session: false },
      async function (err, user) {
        try {
          checkAuthError(err);
          checkAuthorised(user);

          const folders = await Folder.find({ owner: user._id });

          return res.status(200).json(folders);
        } catch (error) {
          return res.status(error.status).json({ message: error.message });
        }
      }
    )(req, res);
  });

export default handler;
