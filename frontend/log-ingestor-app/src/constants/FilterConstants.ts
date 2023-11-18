import { ELOG_ITEM_KEYS } from "../types/LogData.types";
import { LOG_DATA_LABELS } from "./LogDataConstants";

export const FILTER_MENU = [
  {
    label: LOG_DATA_LABELS[ELOG_ITEM_KEYS.RESOURCE_ID],
    value: ELOG_ITEM_KEYS.RESOURCE_ID,
  },
  {
    value: ELOG_ITEM_KEYS.LEVEL,
    label: LOG_DATA_LABELS[ELOG_ITEM_KEYS.LEVEL],
  },
  {
    value: ELOG_ITEM_KEYS.PARENT_RESOURCE_ID,
    label: LOG_DATA_LABELS[ELOG_ITEM_KEYS.PARENT_RESOURCE_ID],
  },
  {
    value: ELOG_ITEM_KEYS.TRACE_ID,
    label: LOG_DATA_LABELS[ELOG_ITEM_KEYS.TRACE_ID],
  },
  {
    value: ELOG_ITEM_KEYS.SPAN_ID,
    label: LOG_DATA_LABELS[ELOG_ITEM_KEYS.SPAN_ID],
  },
];
