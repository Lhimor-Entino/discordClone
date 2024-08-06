import { create } from "zustand";

interface Props {
    isVideo?: boolean,
    toggle: (videoCall: boolean, id: number) => void;
    conversationId: number

}


export const useToggleVideo = create<Props>(set => ({
    conversationId: 0,
    isVideo: false,
    toggle: (isVideo, id) => set({
        isVideo,
        conversationId: isVideo ? id : 0
    })
}))