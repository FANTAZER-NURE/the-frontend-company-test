import type { Order } from '@/types/order';
import rawOrders from '../mocks/orders.json';

const ordersData: Order[] = rawOrders;

export const ordersApi = {
  getOrders(offset = 0, limit = 20): Order[] {
    return ordersData.slice(offset, offset + limit);
  },
};
