import ActionTooltip from "@/Components/ActionTooltip";
import { useModal } from "@/Components/Hooks/useModal";
import { cn } from "@/lib/utils";
import { Channel, MemberRole, PageProps } from "@/types";
import { usePage ,router} from "@inertiajs/react";
import {
    EditIcon,
    HashIcon,
    LoaderIcon,
    LockIcon,
    MicIcon,
    TrashIcon,
    VideoIcon,
} from "lucide-react";
import React, { MouseEventHandler } from "react";

interface Props {
    channel: Channel;
    role?: MemberRole;
}
const ICONMAP = {
    "TEXT": HashIcon,
    "AUDIO": MicIcon,
    "VIDEO": VideoIcon,
};

const ServerChannels = (props: Props) => {
    const { channel, role } = props;
    const Icon = ICONMAP[channel.type];
    const {current_channel,current_server} = usePage<PageProps>().props
    const {onOpen} = useModal()
    const navigate = () =>
        router.get(
            route("welcome", {
                server_id: current_server.id,
                channel_id: channel.id
            })
        );

        const handleChannelEdit:MouseEventHandler<SVGSVGElement> = e => {
            e.stopPropagation();
            onOpen("EditChannel",{channel})
        }

        const handleChannelDelete:MouseEventHandler<SVGSVGElement> = e => {
            e.stopPropagation();
            onOpen("DeleteChannel",{channel})
        }


    return (
        <div
            onClick={navigate}
            className={cn("group  p-1.5 rounded-md flex  items-center gap-x-1.5  w-full hover:bg-slate-700/10 dark:hover:bg-neutral-700/50  transition  duration-300 mb-1",
                current_channel.id === channel.id  && "bg-slate-700/20  dark:bg-slate-700"
            )}
            role="button"
        >
            <Icon className="flex  shrink-0  w-5 h-5  text-muted-foreground"></Icon>
            <p className={ cn("line-clamp-1  font-semibold text-slate-500 dark:text-slate-400",
                   current_channel.id === channel.id  && "text-primary dark:text-slate-200 dark:group-hover:text-white"
            )}>
                {" "}
                {channel.name} 
            </p>
            {channel.name !== "general" && role !== "GUEST" && (
                <div className=" ml-auto flex  items-center  gap-x-1.5">
                    <ActionTooltip label="Edit">
                        <EditIcon
                        onClick={handleChannelEdit}
                            className=" hiiden group-hover:block w-4 h-4  text-slate-500  hover:text-slate-600
                        dark:text-slate-400  hover:dark:text-slate-300 transition duration-300"
                        />
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <TrashIcon
                        onClick={handleChannelDelete}
                            className=" hiiden group-hover:block w-4 h-4  text-slate-500  hover:text-slate-600
                        dark:text-slate-400  hover:dark:text-slate-300 transition duration-300"
                        />
                    </ActionTooltip>
                </div>
            )}

            {channel.name ==="general"  &&  <LockIcon  className=" w-4  h-4  text-slate-500  dark:text-slate-400 "/>}
        </div>
    );
};

export default ServerChannels;
