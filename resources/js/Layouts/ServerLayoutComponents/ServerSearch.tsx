import { Button } from "@/Components/ui/button";
import { Command, CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { ReactNode, useEffect, useState } from "react";



interface Props {
    data: {
        label: string,
        type: "CHANNEL"|"MEMBER",
        data?:{
            icon:ReactNode,
            name:string,
            id:number
        }[];

    }[];
}

const ServerSearch = (props: Props) => {
    const {data} = props;
    const {current_server} = usePage<PageProps>().props
    const [open,setOpen] = useState(false)

    useEffect(() => {
        const down = (e:KeyboardEvent)=>{
                if(e.key==="f" && (e.metaKey||e.ctrlKey)){
                    e.preventDefault();
                    setOpen(val => !val)
                }
        }

        document.addEventListener("keydown",down);
        return ()=>document.removeEventListener("keydown",down);
    },[])

    const handleSelect = ({id,type} : {id:number, type:"CHANNEL" | "MEMBER"})=>{
        setOpen(false);

        if(type==="MEMBER"){
            router.post(route('conversation.initiate'),{
                user_id:id
            })
        }
        if(type==="CHANNEL"){
            router.get(route('welcome',{
                server_id:current_server.id,
                channel_id:id
            }))
        }
    }
    return( 
        <>
            <Button onClick={() => setOpen(val => !val)} size="sm" variant="outline" className="py-1.5 rounded-md flex items-center justify-start gap-x-1.5 w-full">
        <p className=" font-semibold text-sm  text-muted-foreground">
                Search
        </p>

        <kbd className=" pointer-events-none inline-flex  h-4 select-none items-center gap-1 
            rounded border bg-muted px-1.5 font-mono text-[0.65rem] font-medium
            text-primary  ml-auto">
                <span className="text-xs">CTRL+F</span>
        </kbd>
            </Button>

            <Command>
                <CommandDialog open={open}  onOpenChange={setOpen}>

                    <CommandInput className="border-0 focus-visible::!ring-0 focus-visible:!ring-offset-0" placeholder="Search Channels/Members" />

                    {(data||[]).map(({
                            label,
                            type,
                            data:ALLDATA,
                      },index
                    ) => 
                            <CommandList key={index}>
                                        <CommandGroup heading={label}>
                                        {ALLDATA?.map(({id,icon,name})=>(

                                            <CommandItem onSelect={() => handleSelect({id,type})} key={id}>
                                                    {icon}
                                                    <span>{name}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                            </CommandList>
                    )}

                 

                </CommandDialog>
            </Command>

  
        </>
    );
};

export default ServerSearch;
