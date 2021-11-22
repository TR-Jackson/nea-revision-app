import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { useRouter } from "next/router";
import Button from "../../components/UI/Button/Button";

import useUser from "../../hooks/useUser";

export default function Folder() {
  const router = useRouter();
  const { folder, user: owner } = router.query;
  const { user, mutateUser } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [folderInfo, setFolderInfo] = useState();

  const deleteHandler = () => {
    Router.push("/");
    axios
      .post("/folder/delete", { folderName: folder })
      .then(console.log("deleted"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (router.isReady)
      axios
        .get(`/folder/${folder}/${owner}`)
        .then((res) => {
          setFlashcards(res.data.flashcards);
          setFolderInfo(res.data.folder);
        })
        .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <p className="text-4xl font-bold">WIP</p>
      <Button danger onClick={deleteHandler}>
        DELETE FOLDER
      </Button>
      <p>This is the folder page for the folder: {folder}</p>
      <p>For the user: {owner}</p>
    </div>
  );
}
