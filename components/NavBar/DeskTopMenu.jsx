import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import SigninButton from "./SigninButton";


const DeskTopMenu = () => {
  const {data : session } = useSession();

  return (
    <div className="sm:flex hidden">
    {session?.user ? (
      <div className="flex gap-3 md:gap-5">
        <Link href={"/create-prompt"} className="black_btn">
          Create Prompt
        </Link>

        <button type="button" className="outline_btn" onClick={signOut}>
          Sign Out
        </button>

        <Link href="/profile">
          <Image
            src={"/assets/images/logo.svg"}
            width={37}
            height={37}
            className="rounded-full"
            alt="Profile"
          />
        </Link>
      </div>
    ) : (
      <SigninButton />
    )}
  </div>
  )
}

export default DeskTopMenu