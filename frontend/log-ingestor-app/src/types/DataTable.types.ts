export type IDataTableRow = {
  [key in string]: string;
};

export interface IDataTableHeader {
  value: string;
  label: string;
}

export interface IDataTablePassedProps {
  headers: IDataTableHeader[];
  rows: IDataTableRow[];
}
