import { useEffect, useState } from "react";
import axios from "../../lib/axiosConfig";
import Router from "next/router";
import { useRouter } from "next/router";
import useSWR from "swr";

import Button from "../../components/UI/Button/Button";

export default function Folder() {
  const router = useRouter();
  const { folder: foldername, user: owner } = router.query;

  const { data: folderData } = useSWR(
    router.isReady && `/folder/${owner}/${foldername}`,
    router.isReady && axios
  );

  const deleteHandler = () => {
    Router.push("/");
    axios
      .post("/folder/delete", { folderName: folderName })
      .then(console.log("deleted"))
      .catch((err) => console.log(err));
  };

  return folderData ? (
    <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center space-y-6 my-6">
      <div className="flex bg-blue-chill-200 rounded-md p-5 w-3/4 mx-auto">
        <div className="flex flex-col flex-grow justify-center font-semibold">
          <p>Name: {folderData.folder.name}</p>
          <p>Description: {folderData.folder.description}</p>
        </div>
        <div className="flex flex-col space-y-4 mx-2">
          <Button danger onClick={deleteHandler}>
            DELETE FOLDER
          </Button>
          <Button main onClick={() => alert("edit")}>
            EDIT FOLDER
          </Button>
        </div>
      </div>
      <div className="w-full m-auto">
        {folderData.flashcards.map((card, i) => (
          <div key={i} className="flex space-x-2">
            <div className="bg-blue-chill-400 w-full py-6 px-10 flex justify-between">
              <p>{card.front}</p>
              <p>{card.back}</p>
            </div>
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
