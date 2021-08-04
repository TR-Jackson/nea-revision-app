import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import useSWR from "swr";

export default function Home() {
  const { data: userData } = useSWR("/user");
  // useEffect(() => {
  //   console.log(
  //     document.cookie
  //       .match(/^(.*;)?\s*jwt\s*=\s*[^;]+(.*)?$/)[0]
  //       .replace("jwt=", "")
  //   );
  // });
  return (
    <div>
      <p>This is the home page</p>
      {/* {console.log(userData)} */}
      <Link href="/logout">log out</Link>
    </div>
  );
}
