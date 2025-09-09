import type { Customer, RawCustomer } from '@/types/customer';
import rawUsers from '../mocks/customers.json';
import { v5 as uuidv5 } from 'uuid';

const mappedCustomers: Customer[] = rawUsers.map((user: RawCustomer) => ({
  id: uuidv5(String(user.email), uuidv5.DNS),
  ...user,
}));

export const api = {
  getCustomers: (): Customer[] => {
    return mappedCustomers;
  },
  getCustomer: (id: string): Customer | undefined => {
    return mappedCustomers.find((c: Customer) => c.id === id);
  },
};
