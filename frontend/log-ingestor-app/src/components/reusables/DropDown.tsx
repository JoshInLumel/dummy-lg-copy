import React from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { FixedSizeList } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
import {
  IDropDownMenuItem,
  IDropDownPassedProps,
} from "../../types/DropDown.types";

const DropDown = (props: IDropDownPassedProps) => {
  const { menu, label, onSelect } = props;
  const limitedOptions = menu.slice(0,50);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={limitedOptions}
      size="small"
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(_, value) => {
        onSelect(value as IDropDownMenuItem);
      }}
    />
  );
};

export default DropDown;
