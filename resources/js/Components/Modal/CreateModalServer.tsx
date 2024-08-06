import { ChangeEventHandler, FormEventHandler, useMemo, useState } from "react";
import { useModal } from "../Hooks/useModal";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { useForm } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, UploadCloudIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "sonner";
interface Props {}

const fileTypes = ["JPG", "PNG", "WEBP", "JPEG"];

const CreateServerModal = (props: Props) => {
    const { isOpen, onClose, type } = useModal();
    const [imagePreview, setImagePreview] = useState<string | undefined>();
    const OPEN = useMemo(
        () => isOpen && type === "CreateServer",
        [isOpen, type]
    );
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        image: undefined as File | undefined,
    });

    const handleClose = () => {
        onClose();
        reset();
    };

    const handleUploaderChange = (file: File) => {
        const url = URL.createObjectURL(file);
        setData("image", file);
        setImagePreview(url);
    };

    const onImageSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { target } = e;
        if (!target.files) return;
        const file = target.files[0];
        const url = URL.createObjectURL(file);
        setData("image", file);
        console.log(target.files[0]);
        setImagePreview(url);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        console.log(e);
        post(route("servers.store"), {
            onSuccess: () => {
                toast.success("Server Created Successfully");
                onClose();
            },
            onError: () =>
                toast.error(
                    "An error occurred while creating the server. Please try again."
                ),
        });
    };

    return (
        <Dialog open={OPEN} onOpenChange={handleClose}>
            <DialogContent className="p-0 overflow-auto">
                <DialogHeader className="pt-7 px-5">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create a Server
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Provide a server name and image.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={onSubmit}
                    id="server"
                    className="flex flex-col gap-y-6"
                >
                    <div className="flex flex-col gap-y-6 px-5">
                        <div className="flex flex-col items-center justify-center gap-y-7">
                            {(errors.name || errors.image) && (
                                <FileErrorAlert
                                    messages={[
                                        errors.image || "",
                                        errors?.name || "",
                                    ]}
                                />
                            )}
                        </div>
                        <FileUploader
                            types={fileTypes}
                            name="file"
                            handleChange={handleUploaderChange}
                            hoverTitle="Upload or drop a file"
                        >
                            <label
                                htmlFor="image"
                                className="flex flex-col items-center justify-center cursor-pointer p-6"
                            >
                                {!imagePreview ? (
                                    <UploadCloudIcon size={150} />
                                ) : (
                                    <img
                                        src={imagePreview}
                                        width={150}
                                        height={150}
                                    />
                                )}

                                <p>Click To Select an Image</p>
                                <p>Or Drag and Drop Images Here...</p>
                            </label>
                        </FileUploader>
                        <input
                            id="image"
                            type="file"
                            hidden
                            accept=".png,.jpeg,.jpg,.webp,"
                            onChange={onImageSelect}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="uppercase text-xs font-bold">
                            Server Name
                        </Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            disabled={processing}
                            className="border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0"
                            placeholder="Server Name"
                        />
                    </div>
                </form>

                <DialogFooter>
                    <Button disabled={processing} form="server" type="submit">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default CreateServerModal;

const FileErrorAlert = (props: { messages: string[] }) => {
    const { messages } = props;
    return (
        <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {messages.map((msg, i) => (
                    <span key={msg}>{msg}</span>
                ))}
            </AlertDescription>
        </Alert>
    );
};
