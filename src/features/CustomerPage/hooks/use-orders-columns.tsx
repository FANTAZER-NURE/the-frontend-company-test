import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Order } from '@/types/order';

export function useOrdersColumns(): ColumnDef<Order>[] {
  return useMemo<ColumnDef<Order>[]>(
    () => [
      { accessorKey: 'number', header: 'Order #', size: 120 },
      { accessorKey: 'itemName', header: 'Item', size: 240 },
      { accessorKey: 'amount', header: 'Qty', size: 80 },
      {
        accessorKey: 'price ',
        header: 'Price',
        size: 140,
        cell: (info) => {
          const value = info.getValue<number>();
          const currency = info.row.original.currency;
          return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency,
          }).format(value);
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        size: 160,
        cell: (info) =>
          new Date((info.getValue() as number) * 1000).toLocaleDateString(),
      },
      {
        accessorKey: 'shippedAt',
        header: 'Shipped',
        size: 160,
        cell: (info) =>
          new Date((info.getValue() as number) * 1000).toLocaleDateString(),
      },
    ],
    []
  );
}
