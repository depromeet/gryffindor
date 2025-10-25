import type { Dispatch, SetStateAction } from "react";

export interface FilterData {
  price: { min: number; max: number };
  honbobLevel: number;
  seatTypes: ("FOR_ONE" | "FOR_TWO" | "FOR_FOUR" | "CUBICLE" | "BAR_TABLE")[];
  categories: string[];
}

export interface SectionConfig {
  key: string;
  label: string;
  options: string[];
  isMultiple: boolean;
  getSelected: (draft: FilterData) => string[];
  onChange: (setDraft: Dispatch<SetStateAction<FilterData>>) => (selected: string[]) => void;
  withCheckbox?: boolean;
  getChecked?: (draft: FilterData) => boolean;
  onCheckChange?: (setDraft: Dispatch<SetStateAction<FilterData>>) => (checked: boolean) => void;
}
