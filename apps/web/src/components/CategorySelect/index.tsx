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
import { CATEGORY_SELECT_CONSTANTS } from "@/components/CategorySelect/CategorySelect.constants";

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
  const selectValue = value || CATEGORY_SELECT_CONSTANTS.ALL_CATEGORIES_VALUE;

  const handleValueChange = (categoryValue: string) => {
    onChange(
      categoryValue === CATEGORY_SELECT_CONSTANTS.ALL_CATEGORIES_VALUE
        ? ""
        : categoryValue,
    );
  };

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <Label htmlFor={id}>{CATEGORY_SELECT_CONSTANTS.CATEGORY_LABEL}</Label>
      <Select value={selectValue} onValueChange={handleValueChange}>
        <SelectTrigger id={id} className="w-full" size="default">
          <SelectValue
            placeholder={CATEGORY_SELECT_CONSTANTS.CATEGORY_PLACEHOLDER}
          />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value={CATEGORY_SELECT_CONSTANTS.ALL_CATEGORIES_VALUE}>
            All categories
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
