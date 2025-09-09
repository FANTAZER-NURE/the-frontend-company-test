import { DataTable } from '@/components/DataTable';
import { useOrders } from '../hooks/use-orders';
import { useOrdersColumns } from '../hooks/use-orders-columns';
import { Button, Flex } from '@radix-ui/themes';

export default function OrdersTable({ userId }: { userId: string }) {
  const { orders, hasMore, loadMore } = useOrders(userId);
  const columns = useOrdersColumns();

  return (
    <>
      <DataTable data={orders} columns={columns} height={360} />
      <Flex justify="center" mt="3">
        {hasMore && (
          <Button
            onClick={loadMore}
            variant="soft"
            style={{ cursor: 'pointer' }}
          >
            Load more
          </Button>
        )}
      </Flex>
    </>
  );
}
