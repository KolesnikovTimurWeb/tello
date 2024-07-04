import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import UserNav from './UserNav'
import { currentUser } from '@clerk/nextjs/server'

const Navbar = async () => {
   const user = await currentUser()
   console.log(user?.imageUrl)
  return (
    <div className='border-b bg-bacround h-[10vh] flex items-center'> 
         <div className='container flex items-center justify-between'>
            <Link href={'/'}>
            <span className='font-bold text-3xl'>Tello</span>
            </Link>

            <div className='flex gap-x-5 items-center'>
        

               <div className='flex gap-x-5 items-center'>
                  <SignedIn>
                     <UserNav name={user?.fullName as string} image={user?.imageUrl as string} email={user?.emailAddresses[0].emailAddress as string} />
                  </SignedIn>
                 <SignedOut>
                  <SignInButton>
                     <Button variant={"outline"}>
                        Sign Up
                     </Button>
                  </SignInButton>
                  
                 </SignedOut>
                 
               </div>

               <ThemeToggle/>
            </div>
         </div>
    </div>
  )
}

export default Navbar
