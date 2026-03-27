import { Loader } from "lucide-react";
import type { FC } from "react";
import { cn } from "@repo/ui/lib/utils";

export interface SpinnerProps {
  className?: string;
}
export const Spinner: FC<SpinnerProps> = ({ className }) => (
  <div
    className={cn("flex h-dvh w-dvw items-center justify-center", className)}
  >
    <Loader className="animate-spin" />
  </div>
);
