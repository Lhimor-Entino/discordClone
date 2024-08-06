import ModalProvider from "@/Components/ModalProvider";
import NavigationSidebar from "@/Components/NavigationSidebar";
import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
function Layout(props: Props) {
    const { children } = props;
    return (
        <>
            <div className="h-full">
                <div className="hidden md:flex flex-col fixed inset-y-0 h-full w-[4.5rem] z-40">
                    <NavigationSidebar />
                </div>
                <main className="md:pl-[4.5rem] h-full">{children}</main>
            </div>
            <ModalProvider />
        </>
    );
}

export default Layout;
