import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import prisma from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/SubmitButton";

async function getData(userId: string) {
   const data = await prisma.user.findUnique({
     where: {
       id: userId,
     },
     select: {
       name: true,
       email: true,
       colorScheme: true,
     },
   });
 
   return data;
 }
 

export default async function Settings() {
   const userID = await currentUser()
   const data = await getData(userID?.id as string)

   async function postData(formData: FormData) {
      "use server";
  
      const name = formData.get("name") as string;
      const colorScheme = formData.get("color") as string;
  
      await prisma.user.update({
        where: {
          id: userID?.id,
        },
        data: {
          name: name ?? undefined,
          colorScheme: colorScheme ?? undefined,
        },
      });
  
    }
   return(
      <div className='grid items-start gap-8'>
         <div className="flex items-center justify-between px-2">
            <div className="grid gap-1">
               <h2 className="text-3xl md:text-4xl">Settings</h2>
               <h3 className="text-lg text-muted-foreground">Your proffile</h3>
            </div>
         </div>

         <Card>
            <form action={postData}>
               <CardHeader>
                  <CardTitle>General Card</CardTitle>
                  <CardDescription>Please enter your data</CardDescription>
               </CardHeader>
              
               <CardContent >
                  <div className="space-y-2">
                     <div className="space-y-1">
                      <Label>Your Name</Label>
                        <Input
                         name="name"
                         type="text"
                         id="name"
                         placeholder="Your Name"
                         defaultValue={data?.name ?? undefined}
                         />
                               
                     </div>
                     <div className="space-y-1">
                      <Label>Your Email</Label>
                      <Input
                        name="email"
                         type="text"
                         id="email"
                         placeholder="Your email"
                         defaultValue={data?.email ?? undefined}
                         disabled
                      />
                               
                     </div>
                     <div className="space-y-1">
                      <Label>Color Scheme</Label>
                         
                        <Select name="color" defaultValue={data?.colorScheme ?? undefined}>
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a color"/>
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 <SelectLabel>Color</SelectLabel>
                                 <SelectItem value="theme-green">Green</SelectItem>
                                 <SelectItem value="theme-red">Red</SelectItem>
                                 <SelectItem value="theme-blue">Blue</SelectItem>
                                 <SelectItem value="theme-violet">Violet</SelectItem>
                                 <SelectItem value="theme-orange">Orange</SelectItem>
                                 <SelectItem value="theme-rose">Rose</SelectItem>
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                               
                     </div>
                  </div>
               </CardContent>

               <CardFooter>
                     <SubmitButton/>
               </CardFooter>
            </form>
         </Card>
      </div>
   )
}
