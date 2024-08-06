import React, { FormEventHandler, useMemo } from "react";
import { Input } from "../ui/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { ChannelType, PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { useModal } from "../Hooks/useModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { Label } from "../ui/label";
interface Props {}
const CHANNELTYPES: ChannelType[] = ["TEXT", "AUDIO", "VIDEO"];


const CreateChannelModal = (props: Props) => {
    const { isOpen, onClose, type } = useModal();
    const { current_server } = usePage<PageProps>().props;
    const { data, setData, processing, errors, reset, post } = useForm({
        server_id: current_server.id,
        name: "",
        type: "TEXT" as ChannelType,
    });

    const OPEN = useMemo(
        () => isOpen && type === "CreateChannel",
        [isOpen, type]
    );
    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        post(route("servers.channels.store"), {
            onSuccess: () => {
                toast.success("Channel Created Successfully");
                onClose();
            },
            onError: () =>
                toast.error(
                    "An error occurred while creating the Channel. Please try again."
                ),
        });
    };

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent className="p-0 overflow-auto">
                <DialogHeader>
                    <DialogTitle>Create Channel</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={onSubmit}
                    id="channel"
                    className="flex flex-col space-y-7"
                >
                    <div className="flex flex-col gap-y-7 px-5">
                        <Label className="uppercase text-xs font-bold">
                            Channel Name
                        </Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className=" border-0 focus:visible:!ring-0 focus:visible:!ring-offset-0"
                            placeholder="Channel name"
                            disabled={processing}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-y-7 px-5">
                        <Label className="uppercase text-xs font-bold">
                            Channel Type
                        </Label>
                        <Select
                            disabled={processing}
                            value={data.type}
                            onValueChange={(type) =>
                                setData("type", type as ChannelType)
                            }
                        >
                            <SelectTrigger className="bg-secondary border-0 focus:ring-0  ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                <SelectValue placeholder="Please select a Type" />
                            </SelectTrigger>

                            <SelectContent>
                                {CHANNELTYPES.map((type, index) => (
                                    <SelectItem
                                        key={type}
                                        value={type}
                                        className="capitalized"
                                    >
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </form>

                <DialogFooter>
                    <Button form="channel" disabled={processing} type="submit">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateChannelModal;
