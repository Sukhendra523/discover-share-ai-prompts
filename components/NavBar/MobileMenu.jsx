import { useState } from 'react'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import SigninButton from './SigninButton';


const MobileMenu = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const {data: session} = useSession()
  return (
         <div className="sm:hidden flex relative">
         {session?.user ? (
           <div className="flex">
             <Image
               src={"/assets/images/logo.svg"}
               width={37}
               height={37}
               className="rounded-full"
               alt="profile"
               onClick={() => setToggleDropdown(!toggleDropdown)}
             />
             {toggleDropdown && (
               <div className="dropdown">
                 <Link
                   href="/profile"
                   className="dropdown_link"
                   onClick={() => setToggleDropdown(false)}
                 >
                   My Profile
                 </Link>
                 <Link
                   href="/create-prompt"
                   className="dropdown_link"
                   onClick={() => setToggleDropdown(false)}
                 >
                   Create Prompt
                 </Link>
                 <button
                   type="button"
                   onClick={() => {
                     setToggleDropdown(false);
                     signOut();
                   }}
                   className="mt-5 w-full black_btn"
                 >
                   Sign Out
                 </button>
               </div>
             )}
           </div>
         ) : (
           <SigninButton />
         )}
       </div>
  )
}

export default MobileMenu