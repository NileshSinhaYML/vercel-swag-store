import { Spinner } from "@/components/Spinner";
import type { FC } from "react";

export const CartPageLoader: FC = () => (
  <Spinner className="col-span-full size-full" />
);
