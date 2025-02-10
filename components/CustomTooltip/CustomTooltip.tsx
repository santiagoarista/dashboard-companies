import { CustomTooltipProps } from "./CustomTooltip.types";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export function CustomTooltip(props: CustomTooltipProps) {
    const { content } = props;
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Info strokeWidth={1} className="w-5 h-5" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}