import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuGroup, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { CreditCard, DoorClosed, Home, Settings } from 'lucide-react'
import { SignOutButton } from "@clerk/nextjs";

export const navItems = [
   {name:'Home' , href:"/dashboard" , icon:Home},
   {name:'Settings' , href:"/dashboard/settings" , icon:Settings},
   {name:'Billing' , href:"/dashboard/billing" , icon:CreditCard},
]

const UserNav = ({name,email,image}:{name:string; email:string ; image:string}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Button variant={'ghost'} className="rounded-full h-10 w-10 relative">
            <Avatar className="w-10 h-10 rounded-full">
               <AvatarImage  src={image} alt='icon'/>
               <AvatarFallback>User</AvatarFallback>
            </Avatar>
         </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align='end' forceMount>
         <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
               <p className="leading-none text-sm font-medium">{name}</p>
               <p className="leading-none text-muted-foreground text-xs font-medium">{email}</p>
            </div>
         </DropdownMenuLabel>
         <DropdownMenuSeparator/>
         <DropdownMenuGroup>
            {navItems.map((item,index) => (
               <DropdownMenuItem asChild key={index}>
                     <Link href={item.href} className="justify-between w-full  items-center flex">
                     {item.name}
                     <span>
                        <item.icon  className="w-4 h-4"/>
                     </span>
                     </Link>
               </DropdownMenuItem>
            ))}
         </DropdownMenuGroup>
         <DropdownMenuSeparator/>

               <DropdownMenuItem asChild className="w-full flex justify-between items-center">
                     <SignOutButton>
                        <div>
                           <span>LogOut</span>
                           <DoorClosed className="w-4 h-4"/>
                        </div>
                     
                     </SignOutButton>
               </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
