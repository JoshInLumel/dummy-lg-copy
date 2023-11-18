import React from "react";
import { connect } from "react-redux";
import { IRootState } from "../types/StoreTypes";

import DataTable from "../components/reusables/DataTable";
import Filter from "../components/Filter";
import EmptyState from "../components/reusables/EmptyState";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { IDataTableRow } from "../types/DataTable.types";

import { LOG_DATA_HEADERS } from "../constants/LogDataConstants";
import { UI_MESSAGES } from "../constants/UIMessages";

import "../styles/HomePage.css";

const renderDataTable = (tableRows: IDataTableRow[]) => {
  return tableRows.length ? (
    <DataTable rows={tableRows} headers={LOG_DATA_HEADERS} />
  ) : (
    <EmptyState icon={faSearch} message={UI_MESSAGES.NO_RESULTS_FOUND} />
  );
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
