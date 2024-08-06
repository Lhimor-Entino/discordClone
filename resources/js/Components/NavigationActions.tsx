import React, { HTMLAttributes, forwardRef } from "react";
import ActionTooltip from "./ActionTooltip";
import { PlusIcon } from "lucide-react";
import { useModal } from "./Hooks/useModal";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
}

const NavigationActions = forwardRef((props: Props, ref) => {
    const { onClick, disabled } = props;
    const { onOpen } = useModal();
    return (
        <>
            <button onClick={() => onOpen("CreateServer")} className="group">
                <ActionTooltip label="Add a Server" align="center" side="right">
                    <div
                        className="p-2 flex mx-2.5 h-12 w-12 rounded-[1.5rem] group-hover:rounded-[1rem] transition duration-300 overflow-hidden items-center
                    justify-center bg-background dark:bg-slate-700 group:hover:bg-emerald-500"
                    >
                        <PlusIcon
                            size={50}
                            className="group-hover:text-white transition duration-300 text-emerald-500 "
                        />
                    </div>
                </ActionTooltip>
            </button>
        </>
    );
});

export default NavigationActions;
