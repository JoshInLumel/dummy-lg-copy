import { Action } from "redux";
import { IDataTableRow } from "./DataTable.types";
import { ELOG_ITEM_KEYS } from "./LogData.types";

//tableRowsReducer types
export const HYDRATE_TABLE_ROWS = "HYDRATE_TABLE_ROWS";

export interface ITableRowsHydrateAction
  extends Action<typeof HYDRATE_TABLE_ROWS> {
  payload: IDataTableRow[];
}

//tableFilterDropDown types
export const HYDRATE_TABLE_FILTER_DROP_DOWN = "HYDRATE_TABLE_FILTER_DROP_DOWN";

export interface IDropDownData {
  label: string;
  value?: string;
}

export interface ITableFilterDropDowData {
  resourceIdDropDownData: IDropDownData[];
  levelDropDownData: IDropDownData[];
  parentResourceIdDropDownData: IDropDownData[];
  traceIdDropDownData: IDropDownData[];
  spanIdDropDownData: IDropDownData[];
}

export interface IProcessedLogData {
  tableRows: IDataTableRow[];
  tableFilterDropDownData: ITableFilterDropDowData;
}

export interface ITableFilterDropDownHydrateAction
  extends Action<typeof HYDRATE_TABLE_FILTER_DROP_DOWN> {
  payload: ITableFilterDropDowData;
}

//rootState types
export interface IRootState {
  tableRows: IDataTableRow[];
  tableFilterDropDown: ITableFilterDropDowData;
}
