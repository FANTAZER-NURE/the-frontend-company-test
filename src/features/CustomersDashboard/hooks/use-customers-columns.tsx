import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Avatar } from '@radix-ui/themes';
import { ImageIcon } from 'lucide-react';
import type { Customer } from '@/types/customer';

export function useCustomersColumns(): ColumnDef<Customer>[] {
  return useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        id: 'avatar',
        header: '',
        size: 65,
        cell: (info) => {
          const row = info.row.original;
          return (
            <Avatar
              src={row.avatar}
              fallback={<ImageIcon width={28} height={28} />}
              radius="medium"
            />
          );
        },
      },
      { accessorKey: 'firstName', header: 'First name', size: 180 },
      { accessorKey: 'lastName', header: 'Last name', size: 180 },
      { accessorKey: 'email', header: 'Email', size: 300 },
      { accessorKey: 'country', header: 'Country', size: 250 },
      { accessorKey: 'city', header: 'City', size: 180 },
      { accessorKey: 'gender', header: 'Gender', size: 120 },
    ],
    []
  );
}
