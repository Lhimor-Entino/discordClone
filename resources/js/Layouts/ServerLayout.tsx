import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import React, { ReactNode } from "react";
import ServerSidebar from "./ServerLayoutComponents/ServerSidebar";

interface Props {
    children: ReactNode;
}

const ServerLayout = (props: Props) => {
    // const {} =  usePage<PageProps>().props
    const { children } = props;
    return (
        <div className="h-full">
            <div className="hidden md:flex flex-col h-full w-60 z-20 inset-y-0 fixed">
                <ServerSidebar />
            </div>
            <div className="h-full md:pl-60">
                {children}
            </div>
        </div>
    );
};

export default ServerLayout;
