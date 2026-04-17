import type { FC } from "react";

export type CartPageHeaderProps = {
  title: string;
  error: string | null;
};

export const CartPageHeader: FC<CartPageHeaderProps> = ({ title, error }) => (
  <div className="flex flex-col gap-2">
    <h1 className="text-2xl font-bold lg:text-3xl">{title}</h1>
    {error ? (
      <p className="text-destructive text-sm" role="alert">
        {error}
      </p>
    ) : null}
  </div>
);
