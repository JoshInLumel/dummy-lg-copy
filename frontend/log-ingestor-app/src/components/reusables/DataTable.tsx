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

const renderTableHeaders = (headers: IDataTableHeader[]) => {
  return headers.map((header, index) => {
    return (
      <StyledTableCell
        key={`${header}_${index}_table_header`}
        align="right"
        style={{ minWidth: 120 }}
      >
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

const VirtuosoTableComponents: TableComponents<IDataTableRow> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props: any) => (
    <Table {...props} sx={{ minWidth: 650 }} aria-label="simple table" />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }: { item: any }) => (
    <TableRow {...props} />
  ),
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent(headers: IDataTableHeader[]) {
  return <TableRow>{renderTableHeaders(headers)}</TableRow>;
}

function rowContent(
  _index: number,
  row: IDataTableRow,
  headers: IDataTableHeader[]
) {
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
}

const DataTable = (props: IDataTablePassedProps) => {
  const { headers, rows } = props;

  return (
    <Paper style={{ width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={() => fixedHeaderContent(headers)}
        itemContent={(_index: number, row: IDataTableRow) =>
          rowContent(_index, row, headers)
        }
      />
    </Paper>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>{renderTableHeaders(headers)}</TableRow>
    //     </TableHead>
    //     <TableBody>{renderTableRows(props)}</TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default DataTable;
