import { ELOG_ITEM_KEYS } from "./LogData.types";
import { ITableFilterDropDowData } from "./StoreTypes";
import { IDropDownMenuItem } from "./DropDown.types";

export type IFilterData = {
  [key in ELOG_ITEM_KEYS]?: {
    value: string;
    label: string;
  };
};

export interface IRenderFilterDropDowns {
  tableFilterDropDown: ITableFilterDropDowData;
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
}

export interface IUpdateFilterData {
  dropDownType: ELOG_ITEM_KEYS;
  selectedItem: IDropDownMenuItem;
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
}

export interface IResetFilterData {
  setFilterData: (data: IFilterData) => void;
}
