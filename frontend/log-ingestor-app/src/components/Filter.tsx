import React, { useState } from "react";
import { connect } from "react-redux";

import DropDown from "./reusables/DropDown";
import IconRenderer from "./reusables/IconRenderer";

import { faFilter, faUndo } from "@fortawesome/free-solid-svg-icons";

import { FilterService } from "../services/FilterService";

import { FilterUtils } from "../utils/FilterUtils";

import { FILTER_MENU } from "../constants/FilterConstants";

import { IRootState } from "../types/StoreTypes";
import {
  IFilterData,
  IRenderFilterDropDowns,
  IResetFilterData,
} from "../types/Filter.types";
import { IDropDownMenuItem } from "../types/DropDown.types";

import "../styles/Filter.css";

const handleOnResetClick = (props: IResetFilterData) =>
  FilterService.resetFilter(props);

const renderDropDowns = (props: IRenderFilterDropDowns) => {
  const { tableFilterDropDown, filterData, setFilterData } = props;

  const updateFilterDataProps = {
    filterData,
    setFilterData,
  };

  return FILTER_MENU.map((item) => {
    const { value, label } = item;
    const dropDownData = FilterUtils.getDropDownData(
      tableFilterDropDown,
      value
    );

    return (
      <DropDown
        menu={dropDownData}
        value={filterData[value]?.value ?? ""}
        label={label}
        onSelect={(data: IDropDownMenuItem) => {
          FilterService.updateFilterData({
            ...updateFilterDataProps,
            dropDownType: value,
            selectedItem: data,
          });
        }}
      />
    );
  });
};

const Filter = (props: StateProps) => {
  const { tableFilterDropDown } = props;
  const [filterData, setFilterData] = useState<IFilterData>(
    FilterUtils.getDefaultFilterData()
  );

  return (
    <div className="filter-container">
      <div className="header">
        <div className="left-content">
          <IconRenderer icon={faFilter} />
          <div className="title">Filter</div>
        </div>
        <div
          className="right-content"
          onClick={() => handleOnResetClick({ setFilterData })}
        >
          <IconRenderer icon={faUndo} />
          <div className="title">Reset</div>
        </div>
      </div>
      <div className="body">
        {renderDropDowns({ tableFilterDropDown, filterData, setFilterData })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  tableFilterDropDown: state.tableFilterDropDown,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Filter);
