import { usePage } from '@inertiajs/react'
import {  PageProps } from "@/types";
import React from 'react'
import ChatHeader from '@/Components/ChatComponents/ChatHeader';
import ChatInput from '@/Components/ChatComponents/ChatInput';
import ChatMessage from '@/Components/ChatComponents/ChatMessage';
import MediaRoom from '@/Components/MediaRoom';

interface Props {}

const ChannelLayout = (props: Props) => {
    
    const {current_channel,current_server} = usePage<PageProps>().props
    

    const apiRoute = route("message.store",{channel_id: current_channel.id})

    const getAllMessagesRoute = route("message.index",{channel_id: current_channel.id})
  return (
    <div className='bg-white  dark:bg-slate-950  flex  flex-col h-full'>
        <ChatHeader server={current_server} type='Channel' name={current_channel.name}/>
        {
          current_channel.type==="TEXT" &&( <>

            <ChatMessage apiRoute={getAllMessagesRoute} type='Channel'/>
            <ChatInput name={current_channel.name} type='Channel' apiRoute={apiRoute}/>
        </>
        )
           
        }

{
              current_channel.type==="AUDIO" &&( <>

    <MediaRoom chat_id={current_channel.id.toString()} audio/>
        
            </>
            )
              
            }

        
{
          current_channel.type==="VIDEO" &&( <>

<MediaRoom chat_id={current_channel.id.toString()} video/>
    
        </>
        )
           
        }
    </div>
  )
}

export default ChannelLayout