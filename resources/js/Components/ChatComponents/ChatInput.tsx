import axios from 'axios';
import { PlugIcon, PlusIcon } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react'
import { toast } from 'sonner';
import { Input } from '../ui/input';
import EmojiPicker from './EmojiPicker';
import { useModal } from '../Hooks/useModal';

interface Props {
    apiRoute: string;
    name: string;
    type: "Channel" | "Conversation"
}

const ChatInput = (props: Props) => {
    const  {apiRoute, name,type}= props
    const [sending, setSending] = useState(false)
    const [content,setContent] = useState("")
    const {onOpen} = useModal()
    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        if(!content.trim()) return toast.error("Message cannot be empty")

            setSending(true);
            axios.post(apiRoute,{
                content
            }).then(() => setContent(''))
            .catch(e=> toast.error("An error occured while  sending  the message. Please try again." ))
            .finally(() => setSending(false))
    }
  return (
    <form onSubmit={onSubmit}>
        <div className='relative px-4 pb-6'>

       
            <button disabled={sending} type='button' onClick={()=> onOpen("MessageFIle",{href:apiRoute})} className=' absolute top-2  left-8 h-6 w-6
            bg-slate-500  dark:bg-slate-400 dark:hover:bg-slate-300 rounded-full
            flex  items-center  justify-center transition duration-300'   > 
                     <PlusIcon className='text-white dark:text-slate-950' />
            </button>
            

            <Input 
        
            placeholder={`Send to  ${type === 'Conversation' ? name : "#" + name}`}
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={sending}
            className='px-12  py-5 bg-slate-200/90 dark:bg-slate-700/75 border-none border-0 focus-visible:!ring-0
            focus-visible:!ring-offset-0  text-slate-600 dark:bg-slate-200'
            />
            
            <div className='absolute  top-2  right-8'>
                <EmojiPicker onChange={(emoji:string) => setContent(val => `${val} ${emoji}`)} />
            </div>
        </div>
    </form>
  )
}

export default ChatInput