import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import '@livekit/components-styles';
import {LiveKitRoom,VideoConference} from '@livekit/components-react'
import { connect } from 'http2';
interface Props{
    chat_id:string,
    video?:boolean,
    audio?:boolean
}

const MediaRoom = (props: Props) => {

    const {chat_id,
        video,
        audio} =props
    const [token,setToken] =  useState<string>();

    useEffect(() =>{
        if(!chat_id){
            return;
        }
        axios.get(route('livekit.generate',{
            chat_id
        }))
        .then(({data}) =>setToken(data))
        .catch(() => toast.error("Failed to generate token. Please try again."))
    },[chat_id])

    if(!token){
        return(
            <div className='flex flex-col flex-1 justify-center items-center'>
                <Loader2Icon  className='h-7 w-7 text-neutral-500 animate-spin my-3.5'/>
                <p className=' text-sm text-neutral-500 dark:text-neutral-400'>
                Loading...
                </p>
                 
            </div>
        )
    }
  return (
        <LiveKitRoom data-lk-theme="default" serverUrl={import.meta.env.VITE_LIVEKIT_URL} connect={true} token={token} video={video} audio={audio}>
                <VideoConference />
        </LiveKitRoom>
  )
}

export default MediaRoom