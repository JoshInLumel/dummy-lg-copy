import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import {
  IDataTableHeader,
  IDataTablePassedProps,
} from "../../types/DataTable.types";
import { TABLE_CELL_PROPS } from "../../constants/DataTableConstants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const renderTableHeaders = (headers: IDataTableHeader[]) => {
  return headers.map((header, index) => {
    return (
      <StyledTableCell key={`${header}_${index}_table_header`} align="right">
        {header.label}
      </StyledTableCell>
    );
  });
};

const renderTableRows = (props: IDataTablePassedProps) => {
  const { headers, rows } = props;

  let tableCellProps = { ...TABLE_CELL_PROPS };

  return rows.map((row) => {
    const { resourceId } = row;

    return (
      <StyledTableRow
        key={resourceId}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {headers.map((header, headerIndex) => {
          const { value } = header;

          if (headerIndex === 0) {
            tableCellProps = {
              ...tableCellProps,
              component: "th",
              scope: "row",
            };
          }

          return (
            <StyledTableCell
              key={`${header}_${headerIndex}_row`}
              {...tableCellProps}
            >
              {row[value]}
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
    );
  });
};

const DataTable = (props: IDataTablePassedProps) => {
  const { headers } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>{renderTableHeaders(headers)}</TableRow>
        </TableHead>
        <TableBody>{renderTableRows(props)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
