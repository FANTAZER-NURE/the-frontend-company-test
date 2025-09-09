import { useMemo, useCallback, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
} from '@radix-ui/themes';
import { useCustomer } from '../hooks/use-customer';
import { useToast } from '@/features/toast/ToastProvider';
import { ImageIcon } from 'lucide-react';
import styles from './CustomerPage.module.scss';
const OrdersTableLazy = lazy(() => import('./OrdersTable'));

export const CustomerPage = () => {
  const navigate = useNavigate();
  const { customer, error } = useCustomer();
  const { show } = useToast();

  useEffect(() => {
    if (error) {
      show({ title: 'Error', description: error, variant: 'error' });
    }
  }, [error, show]);

  const fullName = useMemo(() => {
    if (!customer) return '';
    return `${customer.firstName} ${customer.lastName}`;
  }, [customer]);

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (!customer) {
    return (
      <Flex direction="column" gap="3" p="4">
        <Text size="4" weight="medium">
          Customer not found
        </Text>
        <Button variant="soft" onClick={handleBack}>
          Back to list
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="4" p="4" className={styles.container}>
      <Button
        variant="soft"
        onClick={handleBack}
        size="2"
        style={{ width: 'fit-content' }}
      >
        Back
      </Button>

      <Card>
        <Flex gap="6" align="start" p="4" wrap="wrap">
          <Flex gap="4" align="center">
            <Avatar
              src={customer.avatar}
              fallback={<ImageIcon width={28} height={28} />}
              radius="large"
              size="5"
            />
            <Box>
              <Heading size="6" mb="1">
                {fullName}
              </Heading>
              <Text color="gray" asChild>
                <a href={`mailto:${customer.email}`}>{customer.email}</a>
              </Text>
            </Box>
          </Flex>

          <Flex direction="column" gap="3" className={styles.infoCard}>
            <Flex align="center" gap="3">
              <Text size="2" color="gray" className={styles.text}>
                Gender
              </Text>
              <Text size="3" weight="medium">
                {customer.gender}
              </Text>
            </Flex>
            <Flex align="center" gap="3">
              <Text size="2" color="gray" className={styles.text}>
                Country
              </Text>
              <Text size="3" weight="medium">
                {customer.country}
              </Text>
            </Flex>
            <Flex align="center" gap="3">
              <Text size="2" color="gray" className={styles.text}>
                City
              </Text>
              <Text size="3" weight="medium">
                {customer.city}
              </Text>
            </Flex>
            <Flex align="center" gap="3">
              <Text size="2" color="gray" className={styles.text}>
                Address
              </Text>
              <Text size="3" weight="medium" color="gray">
                {customer.street} {customer.streetNumber}, {customer.state}{' '}
                {customer.postCode}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      <Card>
        <Box p="4">
          <Heading size="4" mb="2">
            Orders
          </Heading>
          <Suspense fallback={<Text color="gray">Loading orders…</Text>}>
            <OrdersTableLazy userId={customer.id} />
          </Suspense>
        </Box>
      </Card>
    </Flex>
  );
};
