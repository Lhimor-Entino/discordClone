import React, { useEffect } from "react";
import Layout from "@/Layouts/Layout";
import ServerLayout from "@/Layouts/ServerLayout";
import ChannelLayout from "@/Layouts/ChannelLayout";
import { Head, usePage } from "@inertiajs/react";
import ConversationProvider from "@/Components/ConversationProvider";
import { PageProps } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "@/types";
import { PaginatedMessage } from "@/Components/Hooks/useChatQuery";
interface Props {}

const Welcome = (props: Props) => {

    const  {current_channel} = usePage<PageProps>().props
    const queryClient =useQueryClient()

    useEffect(() =>{
    if(!current_channel) return;
        window.Echo.join("channel_"+current_channel.toString())
        .listen("NewChatMessageEvent",({message} : {message:Message}) =>{
            queryClient.setQueryData([`channel_${current_channel.id.toString()}`],(oldData:any) =>{
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

        .listen("MessageUpdateEvent",({message} : {message:Message}) =>{
            queryClient.setQueryData([`channel_${current_channel.id.toString()}`],(oldData:any) =>{
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
    },[current_channel,queryClient])
    return (
        <>
        <Head title="Welcome"></Head>
  
        <ConversationProvider>  
            <Layout>
                <ServerLayout>
                    <ChannelLayout />
                </ServerLayout>
            </Layout>
        </ConversationProvider>

        </>
       
    );
};

export default Welcome;
