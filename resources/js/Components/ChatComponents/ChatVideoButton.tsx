import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import React, { ButtonHTMLAttributes,FC } from 'react'
import { useToggleVideo } from '../Hooks/UseVideoToggle'
import { LucideIcon, VideoIcon, VideoOffIcon } from 'lucide-react'
import ActionTooltip from '../ActionTooltip'

const ChatVideoButton:FC<ButtonHTMLAttributes<HTMLButtonElement>>= () => {

    const {current_conversation} = usePage<PageProps>().props
    const {isVideo,toggle} = useToggleVideo();

    const Icon:LucideIcon = isVideo?VideoOffIcon:VideoIcon;

    const  toolTipLabel=isVideo? 'End video call':"Start video call";

    if(!current_conversation){
        return null;
    }


    const onClick = () =>{
        const id= isVideo?0:current_conversation.id
        toggle(!isVideo,id);
    }
  return (
  <ActionTooltip side='bottom' label={toolTipLabel}>
    <button onClick={onClick} className='hover:opcaity-75 transit  mr-3.5'>
        <Icon  className='h-6 w-6 text-slate-500 dark:text-slate-400'/>
    </button>

  </ActionTooltip>
  )
}

export default ChatVideoButton