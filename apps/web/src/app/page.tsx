import { Main } from "@/components/Main";
import type { FC, ReactNode } from "react";

const Page: FC<{ children: ReactNode }> = ({ children }) => (
  <Main>{children}</Main>
);

export default Page;
