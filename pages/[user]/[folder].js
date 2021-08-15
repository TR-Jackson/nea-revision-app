import { useRouter } from "next/router";

export default function Folder() {
  const router = useRouter();
  const { folder, user } = router.query;
  return (
    <div>
      <p>
        This is the folder page for the folder: {folder} for the user: {user}
      </p>
    </div>
  );
}
