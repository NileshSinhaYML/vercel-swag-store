"use client";

import type { Category } from "@/types/api/categories";
import type { FC } from "react";

import { cn } from "@ui/lib/utils";
import { Label } from "@ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { CATEGORY_SELECT_ALL_VALUE } from "@/components/CategorySelect/CategorySelect.constants";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { useTranslations } from "next-intl";

export interface CategorySelectProps {
  categories: Category[];
  value: string;
  onChange: (slug: string) => void;
  id?: string;
  className?: string;
}

export const CategorySelect: FC<CategorySelectProps> = ({
  categories,
  value,
  onChange,
  id = "category-filter",
  className,
}) => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.SEARCH_PAGE);
  const selectValue = value || CATEGORY_SELECT_ALL_VALUE;

  const handleValueChange = (categoryValue: string) => {
    onChange(
      categoryValue === CATEGORY_SELECT_ALL_VALUE ? "" : categoryValue,
    );
  };

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <Label htmlFor={id}>{t("CATEGORY_LABEL")}</Label>
      <Select value={selectValue} onValueChange={handleValueChange}>
        <SelectTrigger id={id} className="w-full" size="default">
          <SelectValue placeholder={t("CATEGORY_PLACEHOLDER")} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value={CATEGORY_SELECT_ALL_VALUE}>
            {t("ALL_CATEGORIES")}
          </SelectItem>
          {categories.map(({ slug, name, productCount }) => (
            <SelectItem key={slug} value={slug}>
              {name} ({productCount})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
