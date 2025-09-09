import { useRef } from 'react';
import {
  flexRender,
  getCoreRowModel,
  type ColumnDef,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Table } from '@radix-ui/themes';
import styles from './DataTable.module.scss';

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  height?: number;
  onRowClick?: (row: TData) => void;
};

export function DataTable<TData>({
  data,
  columns,
  height,
  onRowClick,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const parentRef = useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 10,
  });

  const totalSize = rowVirtualizer.getTotalSize();
  const containerStyle = height
    ? { height, overflow: 'auto' as const }
    : undefined;

  return (
    <div ref={parentRef} className={styles.container} style={containerStyle}>
      <Table.Root className={styles.table}>
        <Table.Header className={styles.headerSticky}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeaderCell
                  key={header.id}
                  style={{
                    width: header.column.getSize(),
                    minWidth: header.column.getSize(),
                    maxWidth: header.column.getSize(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body className={styles.body} style={{ height: totalSize }}>
          <tr
            style={{ height: rowVirtualizer.getVirtualItems()[0]?.start ?? 0 }}
          />
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index]!;
            return (
              <Table.Row
                key={row.id}
                style={{
                  height: virtualRow.size,
                  cursor: onRowClick ? 'pointer' : undefined,
                }}
                onClick={
                  onRowClick
                    ? () => onRowClick(row.original as TData)
                    : undefined
                }
              >
                {row.getVisibleCells().map((cell) => {
                  const isAvatar = cell.column.id === 'avatar';
                  return (
                    <Table.Cell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                      }}
                      className={isAvatar ? undefined : styles.cell}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
          <tr
            style={{
              height:
                totalSize -
                (rowVirtualizer.getVirtualItems()[
                  rowVirtualizer.getVirtualItems().length - 1
                ]?.end ?? 0),
            }}
          />
        </Table.Body>
      </Table.Root>
    </div>
  );
}
