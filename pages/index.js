import Link from "next/link";
import { useEffect } from "react";
import axios from "../axios-revise-app";

export default function Home() {
  return (
    <div>
      <p>This is the home page</p>
      <Link href="/auth">authenticate</Link>
    </div>
  );
}
