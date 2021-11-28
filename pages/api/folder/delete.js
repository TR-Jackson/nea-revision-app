import nextConnect from "next-connect";
import passport from "../../../lib/passport";

import {
  checkAuthError,
  checkReqBody,
  checkAuthorised,
} from "../../../util/errors";
import Flashcard from "../../../models/Flashcard";
import Folder from "../../../models/Folder";
import ReviseSession from "../../../models/ReviseSession";

const handler = nextConnect()
  .use(passport.initialize())
  .post((req, res) => {
    passport.authenticate(
      "local-jwt",
      { session: false },
      async function (err, user) {
        try {
          checkAuthError(err);
          checkReqBody(req.body, "/folder/delete");
          checkAuthorised(user);
          const folder = await Folder.findOne({
            owner: user._id,
            name: req.body.folder,
          });
          if (!folder) throw { message: "Invalid folder", status: 400 };

          await Flashcard.deleteMany({ folder: folder._id });
          await ReviseSession.deleteOne({ folder: folder._id });
          await Folder.deleteOne(folder);

          return res.status(200).json();
        } catch (error) {
          return res.status(error.status).json({ message: error.message });
        }
      }
    )(req, res);
  });

export default handler;
