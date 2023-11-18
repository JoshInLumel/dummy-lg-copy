import store from "../store/store";

import { uniqueId } from "lodash";

import { hydrate as hydrateTableRows } from "../reducers/tableRowsReducer";
import { hydrate as hydrateTableFilterDropDown } from "../reducers/tableFilterDropDownReducer";

import { TimeUtils } from "../utils/TimeUtils";

import { IDataTableRow } from "../types/DataTable.types";
import { ELOG_ITEM_KEYS, ILogData } from "../types/LogData.types";
import { IDropDownData, IProcessedLogData } from "../types/StoreTypes";

export class StoreService {
  static hydrateStore = (data: ILogData) => {
    const { tableRows, tableFilterDropDownData } =
      this.getProcessedLogData(data);

    store.dispatch(hydrateTableRows(tableRows));
    store.dispatch(hydrateTableFilterDropDown(tableFilterDropDownData));
  };

  static getProcessedLogData = (data: ILogData): IProcessedLogData => {
    const dataTableData: IDataTableRow[] = [];
    const resourceIdDropDownData: IDropDownData[] = [];
    const levelDropDownData: IDropDownData[] = [];
    const parentResourceIdDropDownData: IDropDownData[] = [];
    const traceIdDropDownData: IDropDownData[] = [];
    const spanIdDropDownData: IDropDownData[] = [];

    data.map((logItem) => {
      const { metadata, timestamp, ...rest } = logItem;
      const { resourceId, level, traceId, spanId } = rest;

      const id = uniqueId();

      resourceIdDropDownData.push({ label: resourceId, value: id });
      levelDropDownData.push({ label: level, value: id });
      parentResourceIdDropDownData.push({
        label: metadata.parentResourceId,
        value: id,
      });
      traceIdDropDownData.push({ label: traceId, value: id });
      spanIdDropDownData.push({ label: spanId, value: id });

      const dataTableRow: IDataTableRow = {
        ...(rest as unknown as IDataTableRow),
        timestamp: TimeUtils.formatTimeStamp(timestamp),
        [ELOG_ITEM_KEYS.PARENT_RESOURCE_ID]: metadata.parentResourceId,
      };

      dataTableData.push(dataTableRow);
    });

    return {
      tableRows: dataTableData,
      tableFilterDropDownData: {
        resourceIdDropDownData,
        levelDropDownData,
        parentResourceIdDropDownData,
        traceIdDropDownData,
        spanIdDropDownData,
      },
    };
  };
}
