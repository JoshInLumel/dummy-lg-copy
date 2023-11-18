import React from "react";
import { connect } from "react-redux";
import { IRootState } from "../types/StoreTypes";

import DataTable from "../components/reusables/DataTable";
import Filter from "../components/Filter";

import { IDataTableRow } from "../types/DataTable.types";

import { LOG_DATA_HEADERS } from "../constants/LogDataConstants";

import "../styles/HomePage.css";

const renderDataTable = (tableRows: IDataTableRow[]) => {
  return <DataTable rows={tableRows} headers={LOG_DATA_HEADERS} />;
};

const renderFilter = () => {
  return <Filter />;
};

const HomePage = (props: StateProps) => {
  const { tableRows } = props;

  return (
    <div className="home-page-container">
      {renderDataTable(tableRows)}
      {renderFilter()}
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  tableRows: state.tableRows,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(HomePage);
