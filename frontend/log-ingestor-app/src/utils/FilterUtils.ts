import {
  IBackendFilterQuery,
  IFilterData,
  IFilterItem,
} from "../types/Filter.types";
import { ELOG_ITEM_KEYS } from "../types/LogData.types";
import { IDropDownData, ITableFilterDropDowData } from "../types/StoreTypes";

export class FilterUtils {
  static getDefaultFilterData = (): IFilterData => {
    const getDefaultkeyData = () => {
      return { value: "", label: "" };
    };

    return {
      resourceId: getDefaultkeyData(),
      level: getDefaultkeyData(),
      parentResourceId: getDefaultkeyData(),
      traceId: getDefaultkeyData(),
      spanId: getDefaultkeyData(),
      dateData: {
        startTime: "",
        endTime: "",
      },
    } as IFilterData;
  };

  static getDropDownData = (
    tableFilterDropDown: ITableFilterDropDowData,
    value: ELOG_ITEM_KEYS
  ): IDropDownData[] => {
    const {
      resourceIdDropDownData,
      levelDropDownData,
      parentResourceIdDropDownData,
      traceIdDropDownData,
      spanIdDropDownData,
    } = tableFilterDropDown;

    switch (value) {
      case ELOG_ITEM_KEYS.RESOURCE_ID:
        return resourceIdDropDownData;
      case ELOG_ITEM_KEYS.LEVEL:
        return levelDropDownData;
      case ELOG_ITEM_KEYS.PARENT_RESOURCE_ID:
        return parentResourceIdDropDownData;
      case ELOG_ITEM_KEYS.TRACE_ID:
        return traceIdDropDownData;
      case ELOG_ITEM_KEYS.SPAN_ID:
        return spanIdDropDownData;
      default:
        return [];
    }
  };

  static generateBackendFilterQuery = (
    data: IFilterData
  ): IBackendFilterQuery => {
    const backendFilterQuery: IBackendFilterQuery = {};

    Object.keys(data).forEach((logkey) => {
      switch (logkey) {
        case "dateData":
          backendFilterQuery[logkey] = data[logkey];
          break;
        default: {
          const filterItem: IFilterItem = data[logkey as ELOG_ITEM_KEYS] ?? {
            value: "",
            label: "",
          };

          const { label } = filterItem;
          backendFilterQuery[logkey as ELOG_ITEM_KEYS] = label;
          break;
        }
      }
    });

    return backendFilterQuery;
  };
}
