import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";

const DateRange = (props: any) => {
  const { from, to } = props;

  const handleChange = (newDateRange: any) => {
    console.log(newDateRange[0]?.toISOString(), newDateRange[1]?.toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker
          localeText={{ start: "Check-in", end: "Check-out" }}
          value={
            [
              dayjs("2023-11-15T18:30:00.000Z"),
              dayjs("2023-11-16T18:30:00.000Z"),
            ] as any
          } // Use the local state as the initial value
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateRange;
