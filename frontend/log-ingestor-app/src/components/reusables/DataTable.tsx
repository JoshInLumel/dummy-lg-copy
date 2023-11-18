import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";

import { styled } from "@mui/material/styles";

import {
  IDataTableHeader,
  IDataTablePassedProps,
  IDataTableRow,
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

const VirualizedTableComponents: TableComponents<IDataTableRow> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ minWidth: 650 }} aria-label="simple table" />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const renderRowContent = (
  _index: number,
  row: IDataTableRow,
  headers: IDataTableHeader[]
) => {
  let tableCellProps = { ...TABLE_CELL_PROPS };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const renderTableHeaders = (headers: IDataTableHeader[]) => {
  return headers.map((header, index) => {
    return (
      <StyledTableCell
        key={`${header}_${index}_table_header`}
        variant="head"
        align="right"
        style={{ minWidth: 120 }}
        sx={{
          backgroundColor: "background.paper",
        }}
      >
        {header.label}
      </StyledTableCell>
    );
  });
};

const renderFixedHeaderContent = (headers: IDataTableHeader[]) => {
  return <StyledTableRow>{renderTableHeaders(headers)}</StyledTableRow>;
};

const DataTable = (props: IDataTablePassedProps) => {
  const { headers, rows } = props;

  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirualizedTableComponents}
        fixedHeaderContent={() => renderFixedHeaderContent(headers)}
        itemContent={(_index: number, row: IDataTableRow) =>
          renderRowContent(_index, row, headers)
        }
      />
    </Paper>
  );
};

export default DataTable;
