"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Lightbulb, MoreVertical, Trash } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
    documentId: Id<"documents">;
}

const Menu = ({ documentId }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({ id: documentId });

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash.",
            error: "Failed to move note to trash."
        });

        router.push("/documents");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-1"
                >
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="end"
              alignOffset={8}
              forceMount
            >
                <DropdownMenuItem>
                    <Lightbulb className="w-4 h-4 text-yellow-300 animate-pulse mr-2" />
                    Notes save automatically.
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onArchive}>
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
                    Last edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default Menu;

Menu.Skeleton = function MenuSkeleton () {
    return (
        <Skeleton className="w-10 h-10" />
    )
};
