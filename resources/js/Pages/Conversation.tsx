import ConversationProvider from '@/Components/ConversationProvider'
import ConversationLayout from '@/Layouts/ConversationLayout'
import Layout from '@/Layouts/Layout'
import ServerLayout from '@/Layouts/ServerLayout'
import { PageProps } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { useQueryClient } from "@tanstack/react-query";
import { PaginatedMessage } from '@/Components/Hooks/useChatQuery'
import { Message } from "@/types";
interface Props {}

const Conversation = (props: Props) => {
    const {current_conversation} = usePage<PageProps>().props
    const queryClient =useQueryClient()
    useEffect(() =>{
        if(!current_conversation) return;
        window.Echo.join("channel_"+current_conversation.id.toString())
        .listen("NewChatMessageEvent",({direct_message :message} : {direct_message:Message}) =>{
            queryClient.setQueryData([`channel_${current_conversation.id.toString()}`],(oldData:any) =>{
                const {pages} = oldData as {pages:PaginatedMessage[]};

                const newData = pages;

                newData[0] = {
                    ...newData[0],
                    data:[message, ...newData[0].data]
                }

                const updated = {
                    ...oldData,pages:newData
                };
                return updated;
            })

    
        })
        .listen("DirectMessageUpdateEvent",({direct_message :message} : {direct_message:Message}) =>{
            queryClient.setQueryData([`channel_${current_conversation.id.toString()}`],(oldData:any) =>{
                const {pages} = oldData as {pages:PaginatedMessage[]};

                const newData = pages;

                newData[0] = {
                    ...newData[0],
                    data:newData[0].data.map((oldMsg) => oldMsg.id!==message.id?oldMsg:message)
                }

                const updated = {
                    ...oldData,pages:newData
                };
                return updated;
            })
        })

        return ()=>window.Echo.leaveAllChannels();
    },[current_conversation?.id,queryClient])
  return (
         <>
            <Head title='Conversation'></Head>
            <ConversationProvider>
                <Layout>
                    <ServerLayout>
                        <ConversationLayout />
                    </ServerLayout>
                </Layout>
            </ConversationProvider>
         </>
  )
}

export default Conversation