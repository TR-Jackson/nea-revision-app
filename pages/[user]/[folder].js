import { useEffect, useState } from "react";
import axios from "../../lib/axiosConfig";
import Router from "next/router";
import { useRouter } from "next/router";

import Button from "../../components/UI/Button/Button";

export default function Folder() {
  const router = useRouter();
  const { folder, user: owner } = router.query;
  const [isLoading, setIsLoading] = useState(true);
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
    if (router.isReady) {
      axios
        .get(`/folder/${folder}/${owner}`)
        .then((res) => {
          setFlashcards(res.data.flashcards);
          setFolderInfo(res.data.folder);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [router.isReady]);

  return !isLoading ? (
    <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center space-y-6 my-6">
      <div className="flex bg-blue-chill-200 rounded-md p-5 w-3/4 mx-auto">
        <div className="flex flex-col flex-grow justify-center">
          <p>Name: {folderInfo.name}</p>
          <p>Description: {folderInfo.description}</p>
        </div>
        <div className="flex flex-col space-y-4 mx-2">
          <Button danger onClick={deleteHandler}>
            DELETE FOLDER
          </Button>
          <Button main onClick={deleteHandler}>
            EDIT FOLDER
          </Button>
        </div>
      </div>
      <div>
        {flashcards.map((card, i) => (
          <div key={i} className="flex space-x-2">
            <p>{card.front}</p>
            <p>{card.back}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <div className="loader"></div>
    </div>
  );
}
