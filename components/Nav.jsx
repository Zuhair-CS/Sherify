"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {signIn, signOut, useSession, getProviders} from "next-auth/react"

export const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response); // ✅ Now this clearly refers to useState's setter
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src= "/assets/images/logo.svg" alt = "Sherify Logo" width={30} height={30} className="object-contain"/>
        <p className="orange_gradient font-bold text-2xl" >Sherify</p>
      </Link>

{/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? <div className="flex gap-3 md:gap-5">
          <Link href="/create-blog" className="black_btn">
            Create Post
          </Link>
          <button type="button" onClick={signOut} className="outline_btn">
            Sign Out
          </button>
          <Link href="/profile" className="flex items-center justify-center">
            <Image src={session?.user.image } width={30} height={30} className="object-contain rounded-full " alt="Profile_logo"/>
          </Link>
        </div>:
        <>
           {providers && Object.values(providers).map((provider) => (
                  <button type="button" key={provider.name} onClick={() => signIn(provider.id)}   className="black_btn">
                    Sign In
                  </button>
                ))}
        </>}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex pointer_cursor cursor-pointer ">
            <Image src="/assets/icons/menu.svg" width={30} height={30} className="object-contain rounded-full" alt="Profile_logo" onClick={()=>{
              setToggleDropdown((prev)=> !prev);
            }}/>

            {toggleDropdown && (
              <div className="dropdown glassmorphism">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                My Profile
                </Link>
                <Link href="/create-blog" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                Create Blog
                </Link>
                <button type="button" onClick={() => {
                  setToggleDropdown(false); 
                  signOut();
                }} className="mt-5 w-full black_btn">
                Sign out
                </button>
              </div>
            )}
          </div>): 
          <>
           {providers && Object.values(providers).map((provider) => (
                  <button type="button" key={provider.name} onClick={() => signIn(provider.id)}   className="black_btn">
                    Sign In
                  </button>
                ))}
          </>}
      </div>
    </nav>
  )
}
