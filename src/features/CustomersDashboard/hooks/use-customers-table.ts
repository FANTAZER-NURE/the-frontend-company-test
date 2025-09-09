import { useMemo } from 'react';
import type { Customer } from '@/types/customer';

export type UseCustomersTableResult = {
  data: Customer[];
};

export function useCustomersTable(data: Customer[]): UseCustomersTableResult {
  const sortedData = useMemo(() => {
    // I'm supposing that in real life client-side sorting will be handled by
    // TanStack's getSortedRowModel in the table. This hook is used to maintain
    // SOLID principles.
    return data;
  }, [data]);

  return {
    data: sortedData,
  };
}
