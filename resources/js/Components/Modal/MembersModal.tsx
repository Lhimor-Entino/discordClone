import { useMemo,FC, useState } from "react";
import { useModal } from "../Hooks/useModal";
import { router, usePage } from "@inertiajs/react";
import { MemberRole, PageProps, Server,User } from "@/types";
import UserAvatar from "../UserAvatar";
import { ROLE_ICON_MAP } from "@/Layouts/ServerLayoutComponents/ServerSidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CheckCheckIcon, GavelIcon, Loader2Icon, MoreVerticalIcon, ShieldQuestionIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";


interface Props {}

function MembersModal({}: Props) {
    
    const { isOpen, onClose, type } = useModal();

    const OPEN = useMemo(
        () => isOpen && type === "Members",
        [isOpen, type]
    );
    const {current_server}= usePage<PageProps>().props
    const {users} = current_server

    
    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
                    <DialogContent className="overflow-auto">
                        <DialogHeader>
                        <DialogTitle className="text-2xl text-center font-bold">
                            Manage Members
                        </DialogTitle>
                        <DialogDescription className="text-center  text-muted-foreground">
                        {
                            `${current_server.users.length.toString()} Members${current_server.users.length ?  's' : ''}`
                        }
                        </DialogDescription>
                        </DialogHeader>

                        <ScrollArea className="mt-7 max-h-[26.25rem] pr.5">
                            {
                                users.map(user => (
                                    <MemberItem current_server={current_server} key={user.id} user={user}/>
                                ))
                            }
                        </ScrollArea>
                    
                    </DialogContent>
        </Dialog>
    )
}

export default MembersModal

interface MemberModalItemProps{
    user:User,
    current_server:Server
}

const  MemberItem:FC<MemberModalItemProps> = ({user,current_server}) => {

    const [processing,setProcessing] = useState(false)

    const onRoleChange = (role:MemberRole) => {
        setProcessing(true)
        router.post(route("servers.member.role_change"),{
            user_id:user.id,
            server_id: current_server.id,
            role
        },{
            onSuccess: ()=> toast.success("Role updated successfully"),
            onError: ()=> toast.error("Failed to update role. Please try again"),
            onFinish: ()=>setProcessing(false)
        })
    }

    const onKick = () => {
        setProcessing(true)
        router.post(route("servers.member.kick"),{
            user_id:user.id,
            server_id: current_server.id,
            
        },{
            onSuccess: ()=> toast.success("Member Kicked successfully"),
            onError: ()=> toast.error("Failed to kidk member. Please try again"),
            onFinish: ()=>setProcessing(false)
        })
    }
    return (
        <>
             <div className=" flex items-center  gap-x-1.5 mb-5">
                <UserAvatar user={user}/>
                <div className=" flex flex-col gap-y-1"> 
                    <p className="text-xs font-semibold flex items-center gap-x-1">
                        {user.name}
                        {ROLE_ICON_MAP[user.pivot.member_role]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {user.email}
                    </p>
                </div>

                {(current_server.user_id!==user.id) &&!processing&&(
                    <div className="ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger >
                                        <MoreVerticalIcon  className="h-4 w-4 text-muted-foreground "/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="left">
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className="flex  items-center">
                                            <span>Role</span>             
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem onClick={() =>onRoleChange("GUEST")}>
                                                <ShieldQuestionIcon className="h-4 w-4 mr-1.5"/>
                                                        GUEST
                                                        {
                                                            user.pivot.member_role ==="GUEST"&&<CheckCheckIcon className="h4- w-4 ml-auto"/>
                                                        }
                                                </DropdownMenuItem>

                                                <DropdownMenuItem onClick={() =>onRoleChange("MODERATOR")}>
                                                <ShieldQuestionIcon className="h-4 w-4 mr-1.5"/>
                                                        MODERATOR
                                                        {
                                                            user.pivot.member_role ==="MODERATOR"&&<CheckCheckIcon className="h4- w-4 ml-auto"/>
                                                        }
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>

                                    <DropdownMenuSeparator />
                                                        
                                    <DropdownMenuItem onClick={onKick}>
                                            <GavelIcon className="h-4 w-4 mr-1.5" />
                                            Kick
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                     </div>
                )}

                {
                    processing && <Loader2Icon className="animate-spin text-secondary-foreground ml-auto w-4 h-4"/>
                }
             </div>
        </>
    )

}