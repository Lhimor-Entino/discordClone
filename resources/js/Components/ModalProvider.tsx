import React, { FC } from "react";
import CreateModalServer from "./Modal/CreateModalServer";
import CreateChannelModal from "./Modal/CreateChannelModal";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types"
import InviteModal from "./Modal/InviteModal";
import MembersModal from "./Modal/MembersModal";
import MessageFileModal from "./Modal/MessageFileModal";
import EditServerModal from "./Modal/EditServerModal";
import DeleteMessageConfirmModal from "./Modal/DeleteMessageConfirmModal";
import EditChannelModal from "./Modal/EditChannelModal";
import DeleteChannelConfirmModal from "./Modal/DeleteChannelConfirmModal";
import DeleteServerConfirmModal from "./Modal/DeleteServerConfirmModal";
import LeaveServerModal from "./Modal/LeaveServerModal";
type Props = {};

const ModalProvider: FC = () => {
    
    const {current_server,current_conversation,auth} = usePage<PageProps>().props
    return (
        <>
            <CreateModalServer />
            {!!current_server&&<CreateChannelModal />}
            <InviteModal />
            <MembersModal />
            <MessageFileModal />
            <EditServerModal />
            <DeleteMessageConfirmModal />
            <EditChannelModal />
            <DeleteChannelConfirmModal />
            <DeleteServerConfirmModal />
            <LeaveServerModal />
        </>
    );
};

export default ModalProvider;
