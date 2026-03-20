import { Loader } from "lucide-react";
import type { FC } from "react";

export const Spinner: FC = () => (
  <div className="flex h-dvh w-dvw items-center justify-center">
    <Loader className="animate-spin" />
  </div>
);
