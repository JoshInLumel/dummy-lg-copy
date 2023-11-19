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
    const {
      dropDownType = null,
      selectedItem,
      dateData = [],
      filterData,
      setFilterData,
    } = props;

    const updatedFilterData = {
      ...filterData,
      ...(dropDownType
        ? {
            [dropDownType]: selectedItem ?? { label: "", value: "" },
          }
        : {
            dateData: {
              startTime: dateData[0]?.toISOString(),
              endTime: dateData[1]?.toISOString(),
            },
          }),
    } as IFilterData;

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
