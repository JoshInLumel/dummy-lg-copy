import { FilterUtils } from "../utils/FilterUtils";

import {
  IFilterData,
  IUpdateFilterData,
  IResetFilterData,
} from "../types/Filter.types";
import { LogService } from "./LogService";

export class FilterService {
  static updateFilterData = (props: IUpdateFilterData) => {
    const { dropDownType, selectedItem, filterData, setFilterData } = props;

    const updatedFilterData: IFilterData = {
      ...filterData,
      [dropDownType]: selectedItem ?? { label: "", value: "" },
    };

    const filterBackendFilterQuery =
      FilterUtils.generateBackendFilterQuery(updatedFilterData);

    LogService.getFilteredLogs(filterBackendFilterQuery).then((data) => {
      console.log(data, "ok@");
    });

    //trigger search query api here

    setFilterData(updatedFilterData);
  };

  static resetFilter = (props: IResetFilterData) => {
    const { setFilterData } = props;

    //trigger search query api here

    setFilterData(FilterUtils.getDefaultFilterData());
  };
}
