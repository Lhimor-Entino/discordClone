import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { Fragment, useRef } from 'react'
import { useChatQuery } from '../Hooks/useChatQuery';
import { Loader2 } from 'lucide-react';
import ChatWelcome from './ChatWelcome';
import ChatItem from './ChatItem';
import { useChatScroll } from '../Hooks/useChatScroll';

interface Props {
    apiRoute: string;
    type : "Channel"|"Conversation"
}

const ChatMessage = (props: Props) => {

    const chatRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    
    const {apiRoute,type} = props

    const {current_channel} = usePage<PageProps>().props

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useChatQuery({
        queryRoute:apiRoute,
        queryKey: `channel_${current_channel.id.toString()}`,
        value: "0"
    });
    const  loadPreviousMsg = () =>{
        if(!data?.pages) return;
        fetchNextPage()
    }

    const messages = data?.pages||[]

    useChatScroll({
        chatRef,
        bottomRef,
        loadMore:loadPreviousMsg,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count:data?.pages?.[0]?.data.length ?? 0
    })


    if(status ==="loading"){
        return (
            <div className='flex flex-col flex-1 justify-center items-center'>
                    <Loader2 className='h-7  w-7 text-slate-500  animate-spin my-3.5' />
                    <p className='text-xs'>
                        Loading messages...
                    </p>
            </div>
        )
    }
    if(status ==="error"){
        return (
            <div className='flex flex-col flex-1 justify-center items-center'>
                    <Loader2 className='h-7 w-7 text-slate-500  my-3.5' />
                    <p className='text-xs'>
                        Server Error...
                    </p>
            </div>
        )
    }

   
  return (
    <div ref={chatRef} className='flex-1 flex flex-col py-3.5 overflow-y-auto'>
        { !hasNextPage && (
                <>
                <div className='flex-1' />
                    <ChatWelcome name={current_channel.name} type={type}/>
                </>
        )}

        {hasNextPage && (
                <>
                    <div className='flex justify-center' />
                    {isFetchingNextPage ? <Loader2 className='h-6 w-6 text-slate-600 animate-spin'/> : (
                        <button onClick={loadPreviousMsg} 
                        className='text-slate-500 hover:text-slate-600 dark:text-slate-400
                         dark:hover:text-slate-300 transition duration-300 text-xs'>
                             Load Previous Message...
                        </button>
                     )}    
                </>
        )}

        <div className='flex flex-col-reverse mt-auto'> 
            {messages.map((msgs,index)=>(
                <Fragment key={index}>
                    { msgs.data.map(msg =><ChatItem type={type} key={msg.id} message={msg} />)}
               
                </Fragment>
            ))}
        </div>

        <div ref={bottomRef}/>
    </div>
  )
}

export default ChatMessage