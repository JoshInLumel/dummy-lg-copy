import React, { useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
// import { ILogData } from "./LogData.types";
import { styled, alpha } from "@mui/material/styles";
import { LogService } from "../../services/LogService";
import { StoreService } from "../../services/StoreService";
import { ILogData } from "../../types/LogData.types";

const SearchComponent = () => {
  //   const [searchQuery, setSearchQuery] = useState("");

  let searchQuery = "";

  const handleSearch = async () => {
    try {
      if (!searchQuery) return;
      console.log("searchQuery: ", searchQuery);

      LogService.getSearchedLogs(searchQuery).then(
        (data: ILogData) => {
          console.log('data: ', data);

          StoreService.hydrateStore(data, false);
        }
      );
     
    } catch (error) {
      console.error(error);
    }
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <Search>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search logs..."
          inputProps={{ "aria-label": "search" }}
          //   ref={inputRef}
          //   value={searchQuery}
          onChange={(e) => {
            if (e.target.value !== searchQuery) {
              // setSearchQuery(e.target.value)
              searchQuery = e.target.value;
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </Search>
  );
};

export default SearchComponent;
