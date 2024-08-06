import { MemberRole, Server } from "@/types";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";

import React from "react";
import {
    ChevronDownIcon,
    LogOutIcon,
    PlusCircleIcon,
    SettingsIcon,
    TrashIcon,
    UserIcon,
    UserPlusIcon,
} from "lucide-react";
import { useModal } from "@/Components/Hooks/useModal";

interface Props {
    role: MemberRole;
    server: Server;
}

const ServerHeader = (props: Props) => {
    const { role, server } = props;
    const isModerator = role === "MODERATOR" || role === "ADMIN";
    const isAdmin = role === "ADMIN";
    const { onOpen } = useModal();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className=" w-full text-base  font-semibold px-2.5 flex items-center h-12 border-slate-200 dark:border-slate-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition duration-300
                justify-between
                ">
                    <span >{server.name}</span>
                    <ChevronDownIcon className="w-5 h-5 " />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56  text-xs  font-medium text-black  dark:text-slate-400  space-y-[0.125rem]">
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen('Invite')}
                        className="text-indigo-600  dark:text-indigo-400  px-2.5 text-sm  cursor-pointer"
                    >
                        Invite People
                        <UserPlusIcon className=" w-4  h-4 ml-auto" />
                    </DropdownMenuItem>
                )}

                {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen('EditServer',{server})}
                            className="px-2.5 py-1.5 text-sm cursor-pointer "
                        >
                            Server Settings
                            <SettingsIcon className=" w-4  h-4 ml-auto" />
                        </DropdownMenuItem>
                )}

                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen('Members')}
                        className="px-2.5 py-1.5 text-sm cursor-pointer "
                    >
                        Manage Members
                        <UserIcon className=" w-4  h-4 ml-auto" />
                    </DropdownMenuItem>
                )}

                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("CreateChannel")}
                        className="px-2.5 py-1.5 text-sm cursor-pointer "
                    >
                        Create Channel
                        <PlusCircleIcon className=" w-4  h-4 ml-auto" />
                    </DropdownMenuItem>
                )}

                {isModerator && <DropdownMenuSeparator />}

                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("DeleteServer")}
                        className="px-2.5 py-1.5 text-sm cursor-pointer "
                    >
                        Delete Server
                        <TrashIcon className=" w-4  h-4 ml-auto" />
                    </DropdownMenuItem>
                )}

                {!isAdmin && (
                    <DropdownMenuItem
                        onClick={() =>onOpen("LeaveServer")}
                        className="px-2.5 py-1.5 text-sm cursor-pointer "
                    >
                        Leave Server
                        <LogOutIcon className=" w-4  h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ServerHeader;
