export type CellValue = 5 | 10 | 50 | 100;

export interface CellProps {
  value?: CellValue;
  toggled?: boolean;
  onToggle?: (state: boolean) => void;
  autoToggle?: boolean;
  clickable?: boolean;
}
