import CreateCryptogram from "@/components/forms/CreateCryptogram";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return <main className=''>
    <CreateCryptogram userId={userInfo._id}/>
  </main>
}
