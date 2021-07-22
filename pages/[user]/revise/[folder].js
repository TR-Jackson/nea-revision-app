import { useRouter } from "next/router";

export default function Revise() {
  const router = useRouter();
  const { folder, user } = router.query;
  return (
    <div>
      <p>
        This is the revise page for the folder: {folder} for the user: {user}
      </p>
    </div>
  );
}
