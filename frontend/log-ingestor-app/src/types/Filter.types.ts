import { ELOG_ITEM_KEYS } from "./LogData.types";
import { ITableFilterDropDowData } from "./StoreTypes";
import { IDropDownMenuItem } from "./DropDown.types";

export interface IFilterItem {
  value: string;
  label: string;
}

export interface IDateData {
  startTime?: string;
  endTime?: string;
}

export type IFilterData = {
  [key in ELOG_ITEM_KEYS]?: IFilterItem;
} & { dateData?: IDateData };

export interface IRenderFilterDropDowns {
  tableFilterDropDown: ITableFilterDropDowData;
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
}

export interface IUpdateFilterData {
  filterData: IFilterData;
  setFilterData: (data: IFilterData) => void;
  dropDownType?: ELOG_ITEM_KEYS;
  selectedItem?: IDropDownMenuItem;
  dateData?: any[];
}

export interface IResetFilterData {
  setFilterData: (data: IFilterData) => void;
}

export type IBackendFilterQuery = {
  [key in ELOG_ITEM_KEYS]?: string | IDateData;
};
