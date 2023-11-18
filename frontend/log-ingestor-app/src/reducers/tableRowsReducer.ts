import { IDataTableRow } from "../types/DataTable.types";
import { ITableRowsHydrateAction } from "../types/StoreTypes";

const initalState: IDataTableRow[] = [];

export const hydrate = (
  tableRows: IDataTableRow[]
): ITableRowsHydrateAction => ({
  type: "HYDRATE_TABLE_ROWS",
  payload: tableRows,
});

const tableRowsReducer = (
  state = initalState,
  action: ITableRowsHydrateAction
): IDataTableRow[] => {
  const { type, payload } = action;

  switch (type) {
    case "HYDRATE_TABLE_ROWS":
      return payload;
    default:
      return state;
  }
};

export default tableRowsReducer;
