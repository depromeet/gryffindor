import { redirect } from "next/navigation";

export default async function Home() {
  // DEPLOY TEST
  return redirect("/home");
}
