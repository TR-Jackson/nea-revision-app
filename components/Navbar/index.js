import Cookies from "js-cookie";
import Router from "next/router";

import useUser from "../../hooks/useUser";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
  const { user, mutateUser } = useUser();

  const logoutHandler = () => {
    mutateUser(false);
    Cookies.remove("jwt");
    Router.push("/auth");
  };

  if (user)
    return (
      <div className="bg-blue-chill-500 w-full h-12">
        <div className="flex w-2/3 mx-auto flex-row p-2">
          <div className="flex flex-row justify-start space-x-2 flex-grow">
            <NavbarItem href="/" text="Home" />
          </div>
          <div className="flex flex-row justify-end space-x-2 mr-2 flex-grow-0">
            <NavbarItem onClick={logoutHandler} text="Log Out" />
          </div>
        </div>
      </div>
    );
  return (
    <div className="bg-blue-chill-500 w-full h-12">
      <p className="font-semibold text-gray-50 text-center text-2xl p-1 cursor-default">
        Authenticate
      </p>
    </div>
  );
}
