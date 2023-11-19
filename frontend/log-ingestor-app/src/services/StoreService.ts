import store from "../store/store";

import { uniqueId } from "lodash";

import { hydrate as hydrateTableRows } from "../reducers/tableRowsReducer";
import { hydrate as hydrateTableFilterDropDown } from "../reducers/tableFilterDropDownReducer";

import { TimeUtils } from "../utils/TimeUtils";

import { IDataTableRow } from "../types/DataTable.types";
import { ELOG_ITEM_KEYS, ILogData } from "../types/LogData.types";
import {
  IDropDownData,
  IGetProcessedLogData,
  IProcessedLogData,
} from "../types/StoreTypes";

export class StoreService {

  static getProcessedLogData = (
    props: IGetProcessedLogData
  ): IProcessedLogData => {
    const { logData, dropDownData = null } = props;

    const dataTableData: IDataTableRow[] = [];

    const storeDropDownData = (value: string, dropDownData: string[]) => {
      if (dropDownData.indexOf(value) === -1) dropDownData.push(value);
    };

    const getDropDownData = (dropDownData: string[]): IDropDownData[] => {
      return dropDownData.map((label) => {
        return {
          value: uniqueId(),
          label,
        };
      });
    };

    logData.map((logItem) => {
      const { metadata, timestamp, ...rest } = logItem;
      const { resourceId, level, traceId, spanId } = rest;

      if (dropDownData) {
        const { resourceIds, levels, parentResourceIds, traceIds, spanIds } =
          dropDownData;

        storeDropDownData(resourceId, resourceIds);
        storeDropDownData(level, levels);
        storeDropDownData(metadata.parentResourceId, parentResourceIds);
        storeDropDownData(traceId, traceIds);
        storeDropDownData(spanId, spanIds);
      }

      const dataTableRow: IDataTableRow = {
        ...(rest as unknown as IDataTableRow),
        timestamp: TimeUtils.formatTimeStamp(timestamp),
        [ELOG_ITEM_KEYS.PARENT_RESOURCE_ID]: metadata.parentResourceId,
      };

      dataTableData.push(dataTableRow);
    });

    return {
      tableRows: dataTableData,
      ...(dropDownData && {
        tableFilterDropDownData: {
          resourceIdDropDownData: getDropDownData(dropDownData.resourceIds),
          levelDropDownData: getDropDownData(dropDownData.levels),
          parentResourceIdDropDownData: getDropDownData(
            dropDownData.parentResourceIds
          ),
          traceIdDropDownData: getDropDownData(dropDownData.traceIds),
          spanIdDropDownData: getDropDownData(dropDownData.spanIds),
        },
      }),
    };
  };
  
  static hydrateStore = (
    data: ILogData,
    isHydrateTableFilterDropDownStore: boolean = true
  ) => {
    const { tableRows, tableFilterDropDownData = null } =
      this.getProcessedLogData({
        logData: data,
        ...(isHydrateTableFilterDropDownStore && {
          dropDownData: {
            resourceIds: [],
            levels: [],
            parentResourceIds: [],
            traceIds: [],
            spanIds: [],
          },
        }),
      });

    store.dispatch(hydrateTableRows(tableRows));

    if (tableFilterDropDownData)
      store.dispatch(hydrateTableFilterDropDown(tableFilterDropDownData));
  };

 
}
