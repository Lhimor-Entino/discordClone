import { PageProps, User } from "@/types";
import { usePage } from "@inertiajs/react";
import React from "react";
import { ROLE_ICON_MAP } from "./ServerSidebar";
import { cn } from "@/lib/utils";
import UserAvatar from "@/Components/UserAvatar";
import { router } from '@inertiajs/react';
interface Props {
    member: User;
}

const ServerMember = (props: Props) => {
    const {member} = props
    const {current_server,auth} =  usePage<PageProps>().props
const {user} = auth;
const   Icon = ROLE_ICON_MAP[member.pivot.member_role];

    const onInitiate = () => {
    
        router.post(route("conversation.initiate"),{
            user_id:member.id
        })
    }

    return <button onClick={onInitiate} className={cn("group  p-1.5  rounded-md flex items-center gap-x-1.5 w-full hover:bg-neutral-700/10  dark:hover:bg-neutral-700/50  transition mb-1")}>

        <UserAvatar className="Iconh-8 w-8" user={member} />
        <p className={cn('font-semibold text-sm  text-neutral-500 group-hover:text-neutral-500 dark:text-neutral-400  dark:group-hover:text-neutral-300 transition',
            'text-primary dark:text-neutral-300  dark:group-hover:text-white'
        )}>
            {member.name}
         
        </p>
        {Icon}
    </button>;
};

export default ServerMember;
