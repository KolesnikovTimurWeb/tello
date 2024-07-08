import Image from "next/image";
import { ThemeToggle } from "./components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ClerkLoading, SignInButton, SignedOut } from '@clerk/nextjs'
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Loader2, Trash } from "lucide-react";
export default async function Home() {
  const user = await currentUser()
  if(user) return redirect('/dashboard')
  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
        <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <div>
                <span className="w-auto px-6 py-3 rounded-full bg-secondary">
                  <span className="text-sm font-medium text-primary">Create your own story</span>
                </span>

                <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">Create Notes with Tello</h1>

                <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
                 Tello is a web-based project management application that uses boards, lists, and cards to help organize tasks and projects. Each board represents a project, with lists used to categorize stages of the project or different workstreams. Cards within lists represent individual tasks or items, which can be moved between lists to reflect progress.
                </p>
              </div>

              <div className="flex justify-center max-w-min mx-auto mt-10">
              <ClerkLoading>
              <Button size={'lg'} disabled className="w-fit">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
              </Button>
            </ClerkLoading>
                <SignedOut>
                  <SignInButton>
                    
                     <Button size={'lg'} className="w-full">Sing up for free</Button>
                  </SignInButton>
                  
                 </SignedOut>
              </div>
            </div>
        </div>
    </section>
  );
}
