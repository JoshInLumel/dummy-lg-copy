import { FilterUtils } from "../utils/FilterUtils";

import {
  IFilterData,
  IUpdateFilterData,
  IResetFilterData,
} from "../types/Filter.types";
import { LogService } from "./LogService";
import { StoreService } from "./StoreService";
import { ILogData } from "../types/LogData.types";

export class FilterService {
  static updateTableRowsStore = (updatedFilterData: IFilterData) => {
    const filterBackendFilterQuery =
      FilterUtils.generateBackendFilterQuery(updatedFilterData);

    LogService.getFilteredLogs(filterBackendFilterQuery).then(
      (data: ILogData) => {
        StoreService.hydrateStore(data, false);
      }
    );
  };

  static updateFilterData = (props: IUpdateFilterData) => {
    const { dropDownType, selectedItem, filterData, setFilterData } = props;

    const updatedFilterData: IFilterData = {
      ...filterData,
      [dropDownType]: selectedItem ?? { label: "", value: "" },
    };

    FilterService.updateTableRowsStore(updatedFilterData);
    setFilterData(updatedFilterData);
  };

  static resetFilter = (props: IResetFilterData) => {
    const { setFilterData } = props;

    const updatedFilterData = FilterUtils.getDefaultFilterData();

    FilterService.updateTableRowsStore(updatedFilterData);
    setFilterData(updatedFilterData);
  };
}
