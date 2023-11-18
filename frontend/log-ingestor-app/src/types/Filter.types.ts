import { ELOG_ITEM_KEYS } from "./LogData.types";
import { ITableFilterDropDowData } from "./StoreTypes";
import { IDropDownMenuItem } from "./DropDown.types";

export interface IFilterItem {
  value: string;
  label: string;
}

export type IFilterData = {
  [key in ELOG_ITEM_KEYS]?: IFilterItem;
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

export type IBackendFilterQuery = {
  [key in ELOG_ITEM_KEYS]?: string;
};
