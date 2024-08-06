import { User } from "@/types";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
    user: User;
    className?: string;
};

const UserAvatar = (props: Props) => {
    const { user, className } = props;
    return (
        <Avatar
            className={cn(
                "!max-h-7 !max-w-[1.75rem] md:!max-h-10 md:!max-w-[2.5rem]",
                className
            )}
        >
            <AvatarImage src={user?.image} alt="user" />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;
