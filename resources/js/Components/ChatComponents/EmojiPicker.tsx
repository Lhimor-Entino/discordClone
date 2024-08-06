import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/Components/ui/popover"
import { useTheme } from '../ThemeProvider';
import { SmileIcon } from 'lucide-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
interface Props {
    onChange: (val:string) =>void;
}

const EmojiPicker = (props: Props) => {
     const {onChange} = props
     const {theme} = useTheme()
  return (
    <Popover>
    <PopoverTrigger>
        <SmileIcon  className='text-slate-500  hover:text-slate-600 dark:text-slate-400  dark:hover:text-slate-300 transition duration-300'/>
    </PopoverTrigger>
    <PopoverContent side='right' sideOffset={40} className='bg-transparent  border-none  shadow-none  drop-shadow-none  mb-16'>
            <Picker data={data} onEmojiSelect={(emoji:any) => onChange(emoji.native)} theme={theme} />
    </PopoverContent>
  </Popover>
  )
}

export default EmojiPicker