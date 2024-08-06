import ChatHeader from "@/Components/ChatComponents/ChatHeader";
import { PageProps } from "@/types"
import { usePage } from "@inertiajs/react"
import { useMemo } from "react";
import ConversationMessage from "./ConversationLayoutComponents/ConversationMessage";
import ChatInput from "@/Components/ChatComponents/ChatInput";
import { useToggleVideo } from "@/Components/Hooks/UseVideoToggle";
import MediaRoom from "@/Components/MediaRoom";

interface Props  {}

const ConversationLayout = (props: Props) => {
    const {current_server,current_conversation,auth} = usePage<PageProps>().props
    const {user} = auth;


    if(!current_conversation){
        return null;
    }

    const {isVideo,conversationId} =useToggleVideo()
    const otherUser =  useMemo(() => user.id!==current_conversation.initiator_id ? current_conversation.initiator: current_conversation.receiver,[current_conversation])
    const apiRoute = useMemo(() =>route("conversation.store",{conversation_id: current_conversation.id}),[current_conversation.id]) 
    const getMsgsRoute = useMemo(() =>route("conversation.show",{conversation_id: current_conversation.id}),[current_conversation.id]) 
  
    return (
    <div className="bg-white dark:bg-slate-950 flex  flex-col h-full">
        <ChatHeader name={otherUser.name} user={otherUser} server={current_server} type="Conversation"/>

        {
          (isVideo && conversationId === current_conversation.id)?(
            <MediaRoom  chat_id={current_conversation.id.toString()} video audio/>
          ): 
          (
            <>
              <ConversationMessage otherUser={otherUser} getMsgsRoute={getMsgsRoute} type="Conversation"/>
              <ChatInput name={otherUser.name} apiRoute={apiRoute} type="Conversation" />
            </>
          )
        }
       
    </div>
  )
}

export default ConversationLayout