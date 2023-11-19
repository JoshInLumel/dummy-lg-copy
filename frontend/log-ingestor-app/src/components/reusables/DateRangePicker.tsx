import React from "react";

import dayjs from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker as MaterialUIDateaRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import { IDateRangePickerPassedProps } from "../../types/DateRangePicker.types";

import "../../styles/DateRangePicker.css";

const DateRangePicker = (props: IDateRangePickerPassedProps) => {
  const { localeText, value, onChange } = props;
  const { startLabel, endLabel } = localeText;

  const handleChange = (newDateRange: any) => onChange(newDateRange);

  const getConvertedValues = () => {
    return [
      value?.[0] ? dayjs(value[0]) : null,
      value?.[1] ? dayjs(value[1]) : null,
    ];
  };

  const convertedValues = getConvertedValues();

  console.log(convertedValues);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <MaterialUIDateaRangePicker
          localeText={{ start: startLabel, end: endLabel }}
          value={convertedValues as any}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
