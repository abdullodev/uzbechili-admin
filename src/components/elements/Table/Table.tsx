import { DataGrid, GridColumns, GridRowParams } from "@mui/x-data-grid";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import useDebounce from "hooks/useDebounce";
import useAllQueryParams from "hooks/useGetAllQueryParams/useAllQueryParams";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store/storeHooks";
import NoDataFound from "./components/noDataFound";
import TableHeader from "./components/tableHeader";
import TablePagination from "./components/tablePagination";
import { reRenderTable } from "./reducer/table.slice";
import { IQueryParams, ITable, ITableData } from "./Table.constants";
import { TableContainerMain } from "./Table.style";
import { getTableColumns, isValidSearch, localization } from "./utils";
import { socketReRender } from "store/reducers/SocketSlice";

const Table = <TData extends { _id: string }>({
  onEditColumn,
  onDeleteColumn,
  onRowClick = undefined,
  onAddButton,
  onDeleteSuccess,
  onDataChange,
  getAllData,
  onSeenClick,
  isRowSelectable = () => true,
  mapData,

  dataUrl,
  deleteUrl,
  columns,
  title,
  exQueryParams = {},
  tableHeight = "calc(100vh - 238px)",
  searchable = false,
  deletable = false,
  selection = deletable ? true : false,
  hasPagination = true,
  numerate = true,
  isGetAll = false,
  addButtonTitle,
  noRerender,

  headerChildren,
  headerChildrenSecondRow,
  headerChildrenSecond,
  insteadOfTable,
}: ITable<TData>) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [search, setSearch] = useState<string>();
  const { debouncedValue: debValue } = useDebounce(search, 500);
  const allParams = useAllQueryParams();
  const isOpen = useAppSelector((store) => store.formDrawerState.isOpen);
  const reRender = useAppSelector((store) => store.tableState.render);
  const socketRender = useAppSelector((store) => store.SocketState.render);
  const dis = useDispatch();
  /** @todo work with query params */
  const [queryParams, setQueryParams] = useState<IQueryParams | undefined>(
    !isGetAll
      ? {
          page: 1,
          limit: 10,
          // search: "", //
        }
      : undefined
  );
  useEffect(() => {
    setQueryParams((prev) => {
      return prev
        ? {
            ...prev,
            search,
            page: 1,
            limit: 10,
          }
        : undefined;
    });
  }, [debValue]);

  /** @todo to get data */
  const { data, refetch, isFetching } = useApi<ITableData>(
    dataUrl,
    {
      ...queryParams,
      ...allParams,
      ...exQueryParams,
    },
    {
      onSuccess(data) {
        const tableData = isGetAll ? get(data, "data", []) : data?.data?.data;
        onDataChange?.(tableData);
        getAllData?.(data?.data);
        if (data?.data?.total > 0 && data?.data?.data?.length === 0) {
          setQueryParams((prev) => ({ ...prev, page: 1, limit: 10 }));
        }
      },
      suspense: false,
    }
  );
  /** @todo to delete */
  const { mutate: deleteMutate, isSuccess: isDeleteSuccess } = useApiMutation(
    deleteUrl || dataUrl,
    "delete"
  );
  const onDelete = () => {
    deleteMutate({
      ids: selectedRows,
    });
  };
  useEffect(() => {
    if (isDeleteSuccess) {
      refetch();
      onDeleteSuccess?.();
    }
    if (reRender && !noRerender) {
      refetch();
      dis(reRenderTable(false));
    }
  }, [isDeleteSuccess, isOpen, reRender]);

  useEffect(() => {
    if (socketRender) {
      refetch();
      dis(socketReRender(false));
    }
  }, [socketRender]);

  /** @constant memorize fetched data */
  const tableData: TData[] = React.useMemo(() => {
    const dataKey: any[] = isGetAll ? get(data, "data", []) : data?.data?.data;
    if (isGetAll && searchable && search) {
      return dataKey?.filter(
        (item) =>
          item?.firstName?.toLowerCase()?.includes(search) ||
          item?.lastName?.toLowerCase()?.includes(search) ||
          item?.name?.toLowerCase()?.includes(search) ||
          item?.car?.name?.toLowerCase()?.includes(search)
      );
    }
    return dataKey?.map((item: any, i: number) => ({
      ...item,
      _number:
        i + 1 + ((queryParams?.page! || 1) - 1) * (queryParams?.limit! || 0),
    }));
  }, [data, search]);

  const tableColumns: GridColumns<TData> = React.useMemo(
    () =>
      getTableColumns<TData>({
        columns,
        numerate,
        onEditColumn,
        onDeleteColumn,
        onSeenClick,
      }),
    [columns]
  );
  const totalData = data?.data?.total || tableData?.length || 0;

  return (
    <>
      <TableContainerMain tableHeight={tableHeight}>
        <TableHeader
          title={title}
          addButtonTitle={addButtonTitle}
          searchable={searchable}
          setSearch={setSearch}
          search={search}
          headerChildren={headerChildren}
          headerChildrenSecondRow={headerChildrenSecondRow}
          headerChildrenSecond={headerChildrenSecond}
          deletable={deletable}
          selectedRows={selectedRows}
          onAddButton={onAddButton}
          onDelete={onDelete}
          dataUrl={dataUrl}
        />
        {tableData?.length === 0 && !isFetching ? (
          <>
            <div className="grid-container no-data">
              <DataGrid rows={[]} sx={{ height: 50 }} columns={tableColumns} />
            </div>
            <NoDataFound />
          </>
        ) : (
          insteadOfTable || (
            <div className="grid-container">
              <DataGrid
                getRowId={(row: any) => row?._id}
                rows={(mapData ? mapData(tableData) : tableData) || []}
                columns={tableColumns}
                localeText={localization}
                pageSize={queryParams?.limit}
                rowsPerPageOptions={[5, 10, 20]}
                loading={isFetching}
                hideFooterPagination
                disableSelectionOnClick
                isRowSelectable={(params: GridRowParams<TData>) =>
                  isRowSelectable?.(params.row)
                }
                onPageSizeChange={(newPageSize) =>
                  setQueryParams((prev) =>
                    prev
                      ? {
                          ...prev,
                          limit: newPageSize,
                        }
                      : undefined
                  )
                }
                onRowClick={(props) => {
                  onRowClick?.(props.row);
                }}
                rowCount={totalData}
                getRowClassName={(params) => (!!onRowClick ? "row-hover" : "")}
                checkboxSelection={selection}
                onSelectionModelChange={(rows, data) => {
                  setSelectedRows(rows);
                }}
                paginationMode="server"
                sx={{ height: "100%" }}
                rowHeight={48}
                headerHeight={45}
              />
            </div>
          )
        )}
        {!!queryParams && hasPagination && (
          <TablePagination
            totalData={totalData}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            tableData={tableData}
          />
        )}
      </TableContainerMain>
    </>
  );
};

export default Table;
