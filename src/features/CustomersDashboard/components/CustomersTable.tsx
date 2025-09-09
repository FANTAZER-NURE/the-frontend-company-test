import type { Customer } from '@/types/customer';
import { useCustomersColumns } from '@/features/CustomersDashboard/hooks/use-customers-columns';
import { DataTable } from '@/components/DataTable';
import { useNavigate } from 'react-router-dom';

type CustomersTableProps = {
  data: Customer[];
};

export function CustomersTable({ data }: CustomersTableProps) {
  const columns = useCustomersColumns();
  const navigate = useNavigate();

  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClick={(row) => navigate(`/users/${row.id}`)}
    />
  );
}
