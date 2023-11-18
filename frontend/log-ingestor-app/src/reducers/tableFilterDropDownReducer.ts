import {
  ITableFilterDropDowData,
  ITableFilterDropDownHydrateAction,
} from "../types/StoreTypes";

const initialState: ITableFilterDropDowData = {
  resourceIdDropDownData: [],
  levelDropDownData: [],
  parentResourceIdDropDownData: [],
  traceIdDropDownData: [],
  spanIdDropDownData: [],
};

export const hydrate = (
  tableFilterDropDownData: ITableFilterDropDowData
): ITableFilterDropDownHydrateAction => ({
  type: "HYDRATE_TABLE_FILTER_DROP_DOWN",
  payload: tableFilterDropDownData,
});

const tableFilterDropDownReducer = (
  state = initialState,
  action: ITableFilterDropDownHydrateAction
): ITableFilterDropDowData => {
  const { type, payload } = action;

  switch (type) {
    case "HYDRATE_TABLE_FILTER_DROP_DOWN":
      return payload;
    default:
      return state;
  }
};

export default tableFilterDropDownReducer;
