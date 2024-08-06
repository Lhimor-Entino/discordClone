import { ChannelType, Channel, Server } from "@/types";
import { create } from "zustand";

export type ModalType = 'CreateServer' | 'DeleteServer' | 'EditServer' | 'CreateChannel' | 'Invite' | "Members" | "MessageFIle"
    | "DeleteMessage" | "EditChannel" | "DeleteChannel" | "LeaveServer"

interface ModalStore {
    type: ModalType | null,
    isOpen?: boolean,
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
    data: ModalData;

}

interface ModalData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
    href?: string
}

export const useModal = create<ModalStore>(set => ({
    data: {},
    type: null,
    onOpen: (type, data = {}) => set({
        isOpen: true,
        type,
        data
    }),
    onClose: () => set({
        isOpen: false,
        type: undefined,
        data: {}
    }),
}))