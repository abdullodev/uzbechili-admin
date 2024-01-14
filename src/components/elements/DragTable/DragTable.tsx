import { MenuOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { ITableData } from "../Table/Table.constants";
import { useAppSelector } from "store/storeHooks";
import useAllQueryParams from "hooks/useGetAllQueryParams/useAllQueryParams";
import useDebounce from "hooks/useDebounce";
import { IQueryParams } from "../Table/Table.constants";
import { get } from "lodash";
import { DragTableStyled } from "./DragTable.style";
import DragTableHeader from "./components/DragTableHeader";
import TablePagination from "../Table/components/tablePagination";
import NoDataFound from "../Table/components/noDataFound";

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
// }

// const columns: ColumnsType<DataType> = [
//   {
//     key: "sort",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//   },
// ];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === "sort") {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: "none", cursor: "move" }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

interface IDragTable {
  columns: any;
  dataUrl: string;
  dragUrl: string;
  dragKey: string;
  isGetAll?: boolean;
  hasPagination?: boolean;
  searchable?: boolean;
  render: boolean;

  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  onAddButton?: () => void;
}
const DragTable: React.FC<IDragTable> = ({
  columns,
  dataUrl,
  dragUrl,
  dragKey,
  isGetAll = false,
  hasPagination = true,
  searchable = true,
  render,

  onAddButton,
  setRender,
}) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [search, setSearch] = useState<string>();
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const { debouncedValue: debValue } = useDebounce(search, 500);
  const allParams = useAllQueryParams();
  const reRender = useAppSelector((store) => store.tableState.render);
  /** @todo work with query params */
  const [queryParams, setQueryParams] = useState<IQueryParams | undefined>(
    !isGetAll
      ? {
          page: 1,
          limit: 10,
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

  const { data, refetch, isFetching } = useApi<ITableData>(
    dataUrl,
    {
      ...queryParams,
      ...allParams,
      // ...exQueryParams,
    },
    {
      onSuccess(data) {
        const tableData = isGetAll ? get(data, "data", []) : data?.data?.data;
        // onDataChange?.(tableData);
        // getAllData?.(data?.data);
        if (data?.data?.total > 0 && data?.data?.data?.length === 0) {
          setQueryParams((prev) => ({ ...prev, page: 1, limit: 10 }));
        }
        setRender(false);
      },
      suspense: false,
    }
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
      setIsDragged(true);
    }
  };

  const tableData: any[] = React.useMemo(() => {
    const dataKey: any[] = isGetAll ? get(data, "data", []) : data?.data?.data;
    if (isGetAll && search) {
      return dataKey?.filter(
        (item) =>
          item?.firstName?.toLowerCase()?.includes(search) ||
          item?.lastName?.toLowerCase()?.includes(search) ||
          item?.name?.uz?.toLowerCase()?.includes(search) ||
          item?.car?.name?.toLowerCase()?.includes(search)
      );
    }
    return dataKey?.map((item: any, i: number) => ({
      ...item,
      _number: i + 1,
      key: i + 1,
    }));
  }, [data, search]);

  const { mutate, status } = useApiMutation(dragUrl, "put");

  useEffect(() => {
    setDataSource(tableData || []);
  }, [tableData]);

  const totalData = data?.data?.total || tableData?.length || 0;

  useEffect(() => {
    if (render) refetch();
  }, [render]);

  const reOrderedData = useMemo(() => {
    return dataSource.map((item: any) => item._id);
  }, [dataSource]);

  useEffect(() => {
    if (status === "success") {
      refetch();
      setIsDragged(false);
    }
  }, [status]);

  useEffect(() => {
    if (isDragged) {
      mutate({ [dragKey]: reOrderedData });
    }
  }, [isDragged]);

  return (
    <DragTableStyled>
      <DragTableHeader
        setSearch={setSearch}
        search={search}
        onAddButton={onAddButton}
        searchable={searchable}
      />
      {tableData?.length === 0 && !isFetching ? (
        <>
          <div className="grid-container no-data">
            <Table
              components={{
                body: {
                  row: Row,
                },
              }}
              rowKey="key"
              columns={columns}
              dataSource={[]}
              pagination={false}
            />
          </div>
          {/* <NoDataFound /> */}
        </>
      ) : (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{
                body: {
                  row: Row,
                },
              }}
              rowKey="key"
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              loading={isFetching}
            />
          </SortableContext>
        </DndContext>
      )}
      {!!queryParams && hasPagination && (
        <TablePagination
          totalData={totalData}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          tableData={tableData}
        />
      )}
    </DragTableStyled>
  );
};

export default DragTable;
