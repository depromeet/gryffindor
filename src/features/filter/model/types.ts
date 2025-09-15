import type { Dispatch, SetStateAction } from "react";

export interface FilterData {
  price: { min: number; max: number };
  level: number | null;
  seatTypes: string[];
  categories: string[];
}

export interface SectionConfig {
  key: string;
  label: string;
  options: string[];
  multiple: boolean;
  getSelected: (draft: FilterData) => string[];
  onChange: (setDraft: Dispatch<SetStateAction<FilterData>>) => (selected: string[]) => void;
  withCheckbox?: boolean;
  getChecked?: (draft: FilterData) => boolean;
  onCheckChange?: (setDraft: Dispatch<SetStateAction<FilterData>>) => (checked: boolean) => void;
}
