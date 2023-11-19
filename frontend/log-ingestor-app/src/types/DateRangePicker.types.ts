import dayjs from "dayjs";

export interface IDateRangePickerPassedProps {
  localeText: {
    startLabel: string;
    endLabel: string;
  };
  onChange: (data: any[]) => void;
  value?: any[];
}
