import useUser from "../hooks/useUser";

export default function Home() {
  const { user, mutateUser } = useUser({ redirectTo: "/auth" });
  if (user)
    return (
      <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center">
        <p>This is the home page</p>
        <br />
        <ul>
          <li>Hello {user.username}</li>
          {user.folders.length !== 0 ? (
            user.folders.map((folder, i) => <p key={i}>{folder}</p>)
          ) : (
            <li>No folders yet</li>
          )}
        </ul>
      </div>
    );
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
