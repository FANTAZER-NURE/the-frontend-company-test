import { useCustomers } from '@/features/CustomersDashboard/hooks/use-cutomers';
import { CustomersTable } from '@/features/CustomersDashboard/components/CustomersTable';
import { useCustomersTable } from '@/features/CustomersDashboard/hooks/use-customers-table';
import { Card, TextField, Select, Button, Flex } from '@radix-ui/themes';
import styles from './CustomersDashboard.module.scss';

export const CustomersDashboard = () => {
  const { customers, filters, setGender, setCountry, setSearch, resetFilters } =
    useCustomers();
  const { data } = useCustomersTable(customers);

  return (
    <Flex direction="column" gap="4" className={styles.wrapper}>
      <Card className={styles.filtersCard}>
        <Flex className={styles.filtersRow} align="center">
          <TextField.Root
            className={styles.control}
            placeholder="Name or email"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField.Root
            className={styles.control}
            placeholder="Country"
            value={filters.country ?? ''}
            onChange={(e) => setCountry(e.target.value || null)}
          />

          <Select.Root
            value={filters.gender ?? 'all'}
            onValueChange={(v) => setGender(v === 'all' ? null : v)}
          >
            <Select.Trigger
              placeholder="Gender"
              className={styles.selectControl}
            />
            <Select.Content>
              <Select.Item value="all">All</Select.Item>
              <Select.Item value="Male">Male</Select.Item>
              <Select.Item value="Female">Female</Select.Item>
              <Select.Item value="Fluid">Fluid</Select.Item>
              <Select.Item value="Other">Other</Select.Item>
            </Select.Content>
          </Select.Root>

          <Button
            variant="ghost"
            onClick={resetFilters}
            className={styles.reset}
          >
            Reset
          </Button>
        </Flex>
      </Card>

      <Card className={styles.tableCard}>
        <CustomersTable data={data} />
      </Card>
    </Flex>
  );
};
