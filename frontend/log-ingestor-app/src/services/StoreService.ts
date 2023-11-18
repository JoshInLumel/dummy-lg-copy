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

    const visitedLevelValueSet = new Set();
    const visitedResourceIdValueSet = new Set();
    const visitedParentResourceValueSet = new Set();
    const visitedTraceIdValueSet = new Set();
    const visitedSpanIdValueSet = new Set();

    //ToDo: uniqueIdentification can done on backend..
    // set can be converted into dropdown options
    // proxy can be done on backend... (size improves, but lookups affects)

    data.map((logItem) => {
      const {
        metadata: { parentResourceId },
        timestamp,
        ...rest
      } = logItem;
      const { level, resourceId, traceId, spanId } = rest;
      const id = uniqueId();
      if (!visitedLevelValueSet.has(level)) {
        visitedLevelValueSet.add(level);
        levelDropDownData.push({ label: level, value: id });
      }

      if (!visitedResourceIdValueSet.has(resourceId)) {
        visitedResourceIdValueSet.add(resourceId);
        resourceIdDropDownData.push({ label: resourceId, value: id });
      }

      if (!visitedParentResourceValueSet.has(parentResourceId)) {
        visitedParentResourceValueSet.add(parentResourceId);
        parentResourceIdDropDownData.push({
          label: parentResourceId,
          value: id,
        });
      }

      if (!visitedTraceIdValueSet.has(traceId)) {
        visitedTraceIdValueSet.add(traceId);
        traceIdDropDownData.push({ label: traceId, value: id });
      }

      if (!visitedSpanIdValueSet.has(spanId)) {
        visitedSpanIdValueSet.add(spanId);
        spanIdDropDownData.push({ label: spanId, value: id });
      }

      // resourceIdDropDownData.push({ label: resourceId, value: id });
      // levelDropDownData.push({ label: level, value: id });
      // parentResourceIdDropDownData.push({
      //   label: parentResourceId,
      //   value: id,
      // });
      // traceIdDropDownData.push({ label: traceId, value: id });
      // spanIdDropDownData.push({ label: spanId, value: id });

      const dataTableRow: IDataTableRow = {
        ...(rest as unknown as IDataTableRow),
        timestamp: TimeUtils.formatTimeStamp(timestamp),
        [ELOG_ITEM_KEYS.PARENT_RESOURCE_ID]: parentResourceId,
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
