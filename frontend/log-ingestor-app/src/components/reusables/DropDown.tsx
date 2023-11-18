import React from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import {
  IDropDownMenuItem,
  IDropDownPassedProps,
} from "../../types/DropDown.types";

const DropDown = (props: IDropDownPassedProps) => {
  const { value, menu, label, onSelect } = props;

  return (
    <Autocomplete
      // value={value}
      disablePortal
      id="combo-box-demo"
      options={menu}
      size="small"
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(_, value) => {
        onSelect(value as IDropDownMenuItem);
      }}
    />
  );
};

export default DropDown;
