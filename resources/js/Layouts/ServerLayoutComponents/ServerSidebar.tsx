import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import {
    HashIcon,
    MicIcon,
    Shield,
    ShieldAlertIcon,
    ShieldCheckIcon,
    VideoIcon,
} from "lucide-react";
import React, { useMemo } from "react";
import ServerHeader from "./ServerHeader";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import { channel } from "process";
import ServerSection from "./ServerSection";
import ServerChannels from "./ServerChannels";
import ServerMember from "./ServerMember";
import ServerSearch from "./ServerSearch";

interface Props {}

const ICON_MAP = {
    "TEXT": <HashIcon className="mr-1.5 h-4 w-4" />,
    "VIDEO": <VideoIcon className="mr-1.5 h-4 w-4" />,
    "AUDIO": <MicIcon className="mr-1.5 h-4 w-4" />,
};

 export const ROLE_ICON_MAP = {
    "GUEST": null,
    "MODERATOR": <ShieldCheckIcon className="mr-1.5 h-4 w-4 text-indigo-500" />,
    "ADMIN": <ShieldAlertIcon className="mr-1.5 h-4 w-4 text-rose-500" />,
};

const ServerSidebar = (props: Props) => {
    const { current_server, auth } = usePage<PageProps>().props;
    const { user } = auth;
    const {users} =  current_server;
    // const role = current_server.users.find((user) => user.id === user.id)?.pivot
    //     .member_role;
    const role = current_server.users.find(({id}) =>id === user.id)?.pivot.member_role || "GUEST";
    const textChannel = useMemo(
        () => current_server.channels.filter(c => c.type === "TEXT"),
        [current_server.channels]
    );
    const audioChannel = useMemo(
        () => current_server.channels.filter((c) => c.type === "AUDIO"),
        [current_server.channels]
    );
    const videoChannel = useMemo(
        () => current_server.channels.filter((c) => c.type === "VIDEO"),
        [current_server.channels]
    );
    
    const  members  = useMemo(() => users.filter(({id}) => id !== user.id),[])

    return (
        <div className=" flex flex-col  h-full text-primary  w-full dark:bg-slate-800 bg-slate-100 ">
            {!!current_server && <ServerHeader server={current_server} role={role} />}
            <ScrollArea className="flex-1 px-2.5">
               <div className="mt-1.5">
                        <ServerSearch data={
                            [{
                                label:"Text Channels",
                                type:'CHANNEL',
                                data:(textChannel||[]).map(channel=>({id:channel.id,name:channel.name,icon:ICON_MAP[channel.type]}))
                            },
                            {
                                label:"Voice Channels",
                                type:'CHANNEL',
                                data:(audioChannel||[]).map(channel=>({id:channel.id,name:channel.name,icon:ICON_MAP[channel.type]}))
                            },
                            {
                                label:"Video Channels",
                                type:'CHANNEL',
                                data:(videoChannel||[]).map(channel=>({id:channel.id,name:channel.name,icon:ICON_MAP[channel.type]}))
                            },
                            {
                                label: "Members",
                                type:'MEMBER',
                                data:(members||[]).map(member=>({id:member.id,name:member.name,icon:ROLE_ICON_MAP[member.pivot.member_role]}))
                            }
                        ]
                        }
                        />
               </div>
                <Separator className="rounded-md  my-1.5" />
                {!!textChannel && (
                    <ServerSection
                        sectionType="Channel"
                        channelType="TEXT"
                        role={role}
                        label="Text Channels"
                    />
                )}
                <div className="flex flex-col gap-y-3 ">
                    {textChannel.map(channel => 
                        <ServerChannels
                            key={channel.id}
                            channel={channel}
                            role={role}
                        />
                    )}
                </div>

                {!!audioChannel && (
                    <ServerSection
                        sectionType="Channel"
                        channelType="AUDIO"
                        role={role}
                        label="vOICE Channels"
                    />
                )}
                <div className="flex flex-col space-y-0.5 ">
                    {audioChannel.map(channel => 
                        <ServerChannels
                            key={channel.id}
                            channel={channel}
                            role={role}
                        />
                    )}
                </div>

                {!!videoChannel && (
                    <ServerSection
                        sectionType="Channel"
                        channelType="VIDEO"
                        role={role}
                        label="Video Channels"
                    />
                )}

                <div className="flex flex-col space-y-0.5 ">
                    {videoChannel.map(channel => 
                        <ServerChannels
                            key={channel.id}
                            channel={channel}
                            role={role}
                        />
                    )}

         
                </div>

            {members.length > 0 &&(
                                <ServerSection
                                    sectionType="Member"
                                    role={role}
                                    label="Members"
                                />
                )}


                <div className="flex flex-col space-y-0.5 ">

                    {members.map(member => 
                        <ServerMember
                            member={member}
                            key={member.id}
                        />
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default ServerSidebar;
