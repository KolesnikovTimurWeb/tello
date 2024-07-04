
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import DashboardNav from "../components/DashboardNav";

async function getData({email,id,firstName,lastName,profileImage}:{
   email:string;
   id:string;
   firstName:string | undefined | null;
   lastName:string | undefined | null;
   profileImage:string | undefined | null;
}) {
   
   const user = await prisma.user.findUnique({
      where:{
         id:id,
      },
      select:{
         id:true,
         stripeCustomerId:true,
      }
   })

   if (!user) {
      const name = `${firstName ?? ""} ${lastName ?? ""}`;
      await prisma.user.create({
        data: {
          id: id,
          email: email,
          name: name,
        },
      });
    }
}
const DashboardLayout = async ({children}:{children:React.ReactNode}) => {
      const user = await currentUser()
      await getData({
         email: user?.emailAddresses[0].emailAddress as string,
         firstName: user?.firstName as string,
         id: user?.id as string,
         lastName: user?.username as string,
         profileImage: user?.imageUrl,
       });
   if(!user) return redirect('/')
   return(
      <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
   )
}
export default DashboardLayout
