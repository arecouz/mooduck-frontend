export type CellValue = number;
export interface CellProps {
  value?: CellValue;
  toggled?: boolean;
  onToggle?: (state: boolean) => void;
  autoToggle?: boolean;
  clickable?: boolean;
}
