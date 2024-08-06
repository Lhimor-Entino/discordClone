import React from "react";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./ModeToogle";
import UserAvatar from "./UserAvatar";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import NavigationActions from "./NavigationActions";
import NavigationItem from "./NavigationItem";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/Components/ui/popover"
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
  
interface Props {}

const NavigationSidebar = (props: Props) => {
    const { user } = usePage<PageProps>().props.auth;
    const { servers } = usePage<PageProps>().props;
    return (
        <div className="flex flex-col gap-y-3.5 h-full items-center text-primary w-full bg-slate-200 dark:bg-slate-900 py-2.5">
         
            <NavigationActions />
            <Separator className="h-[0.12rem] bg-zinc-300 dark:bg-zinc-700 rounded-md  w-10  mx-auto " />
            <ScrollArea className=" flex-1 w-full">
                {(servers || []).map((server) => (
                    <div key={server.id} className="mb-3.5">
                        <NavigationItem server={server} />
                    </div>
                ))}
            </ScrollArea>
            <ModeToggle />
            <Popover>
                <PopoverTrigger>   
                    <UserAvatar user={user} />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <Button onClick={() => router.post(route("logout"))} variant={"outline"} size="sm" className="w-full">
                            <LogOutIcon className="w-5 h-5 mr-2" />
                            Sign Out
                    </Button>
                </PopoverContent>
            </Popover>

         
        </div>
    );
};

export default NavigationSidebar;
