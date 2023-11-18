export enum ELOG_ITEM_KEYS {
  LEVEL = "level",
  MESSAGE = "message",
  RESOURCE_ID = "resourceId",
  TIME_STAMP = "timestamp",
  TRACE_ID = "traceId",
  SPAN_ID = "spanId",
  COMMIT = "commit",
  META_DATA = "metadata",
  PARENT_RESOURCE_ID = "parentResourceId",
}

interface IMetaData {
  parentResourceId: string;
}

interface ILogItem {
  level: string;
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: IMetaData;
}

export type ILogData = ILogItem[];
