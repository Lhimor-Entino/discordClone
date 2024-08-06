import ActionTooltip from "@/Components/ActionTooltip";
import { Button } from "@/Components/ui/button";
import { ChannelType, MemberRole, Server } from "@/types";
import { PlusIcon, SettingsIcon } from "lucide-react";
import React from "react";

interface Props {
    label: string;
    role?: MemberRole;
    sectionType: "Channel" | "Member";
    server?: Server;
    channelType?: ChannelType;
}

const ServerSection = (props: Props) => {
    const { label, role, sectionType, server, channelType } = props;
    return (
        <div className="flex items-center justify-between py-1.5">
            <p className="  text-xs  uppercase  font-bold text-center w-full">
                {label}
            </p>
            {role === "GUEST" && sectionType === "Channel" && (
                <ActionTooltip label="Create Channel" side="top">
                    <Button
                        className=" !h-8 !w-8"
                        size="icon"
                        variant="outline"
                        onClick={() => {}}
                    >
                        <PlusIcon className="w-5 h-5" />
                    </Button>
                </ActionTooltip>
            )}

            {role === "GUEST" && sectionType === "Member" && (
                <ActionTooltip label="Manage Member" side="top">
                    <Button
                        className=" !h-8 !w-8"
                        size="icon"
                        variant="outline"
                        onClick={() => {}}
                    >
                        <SettingsIcon className="w-5 h-5" />
                    </Button>
                </ActionTooltip>
            )}
        </div>
    );
};

export default ServerSection;
