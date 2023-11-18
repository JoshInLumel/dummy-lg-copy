import { combineReducers } from "redux";

import tableRowsReducer from "./tableRowsReducer";
import tableFilterDropDownReducer from "./tableFilterDropDownReducer";

const rootReducer = combineReducers({
  tableRows: tableRowsReducer,
  tableFilterDropDown: tableFilterDropDownReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
