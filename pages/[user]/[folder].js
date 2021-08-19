import axios from "axios";
import Router from "next/router";
import { useRouter } from "next/router";
import Button from "../../components/UI/Button/Button";

import useUser from "../../hooks/useUser";

export default function Folder() {
  const router = useRouter();
  const { folder, user: username } = router.query;
  const { user, mutateUser } = useUser();

  const deleteHandler = () => {
    mutateUser(
      {
        ...user,
        folders: user.folders.filter((f) => f.name !== folder),
      },
      false
    );
    Router.push("/");
    axios
      .post("/folder/delete", { folderName: folder })
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p className="text-4xl font-bold">WIP</p>
      <Button danger onClick={deleteHandler}>
        DELETE FOLDER
      </Button>
      <p>This is the folder page for the folder: {folder}</p>
      <p>For the user: {username}</p>
    </div>
  );
}
