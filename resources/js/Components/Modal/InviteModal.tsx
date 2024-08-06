import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/Components/ui/dialog"
import { useCallback, useMemo, useState } from "react";
import { useModal } from "../Hooks/useModal";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckCheckIcon, CheckIcon, CopyIcon, RefreshCcwDotIcon } from "lucide-react";
import { cn } from "@/lib/utils";
  

interface Props {}

const InviteModal = (props: Props) => {
    
    const {current_server}= usePage<PageProps>().props
    const { isOpen, onClose, type } = useModal();
    const OPEN = useMemo(
        () => isOpen && type === "Invite",
        [isOpen, type]
    );
    const [copied,setCopied] =useState(false)
    const [generating,setGenerating] = useState(false)
    
const [inviteUrl, setInviteUrl] =  useState(route("servers.invite",{invite_code:current_server.invite_code}))


    const generateLink = useCallback(()=>{
        setGenerating(true);
        axios.post(route('servers.generate'),{
            server_id:current_server.id
        }).then(({data}) => setInviteUrl(route("servers.invite",{invite_code: data})))
        .catch(e => toast.error("Failed to generate  invite link. Please  try again"))
        .finally(() => setGenerating(false))
    },[generating,current_server])

    const onCopy = () =>{
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true)
        toast.success("Link copied to clipboard")

        setTimeout(()=>{
            setCopied(false)
        },1000)
    }
  return (
    <Dialog open={OPEN} onOpenChange={onClose}>
   
        <DialogContent>
        <DialogHeader>
                <DialogTitle>Invite People</DialogTitle>
              
        </DialogHeader>
        <div className="p-5">
            <Label className="uppercase text-xs font-bold text-muted-foreground" > Server Invite Link</Label>
            <div className="flex items-center mt-1.5 gap-x-1.5">
                <Input readOnly disabled={generating} className="bg-secondary  !border-0 focus:visible-!ring-0 focus:visible-!ring-offeset-0" value={inviteUrl}/>
            <Button size='icon' disabled={generating} onClick={onCopy}>
                {copied? <CheckIcon className="h-4 w-4" />: <CopyIcon className="h-4 w-4" />}
            </Button>
            </div>
            <Button size='sm' variant="link" disabled={generating} onClick={generateLink} className="text-xs">
                Generate new Link
            <RefreshCcwDotIcon  className={cn("h-4  w-4  ml-1.5",generating&&'animate-spin')}/>
            </Button>
            

        </div>
        </DialogContent>
  </Dialog>
  )
}

export default InviteModal