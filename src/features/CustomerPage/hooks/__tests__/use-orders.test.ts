import { ordersApi } from '@/api/orders';

describe('ordersApi', () => {
  it('paginates deterministically with getOrders(offset, limit)', () => {
    const first = ordersApi.getOrders(0, 5);
    const next = ordersApi.getOrders(5, 5);
    expect(first).toHaveLength(5);
    expect(next).toHaveLength(5);
    // ensure no overlap in IDs between pages
    const firstIds = new Set(first.map((o) => o.number));
    expect(next.every((o) => !firstIds.has(o.number))).toBe(true);
  });
});
