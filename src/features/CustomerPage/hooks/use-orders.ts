import { useEffect, useMemo, useRef, useState } from 'react';
import { ordersApi } from '@/api/orders';
import type { Order } from '@/types/order';

export function useOrders(userId: string | undefined) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  useEffect(() => {
    setOrders([]);
    setOffset(0);
    setHasMore(true);
  }, [userId]);

  const loadMore = () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    const page = ordersApi.getOrders(offset, 20);
    setOrders((prev) => [...prev, ...page]);
    setOffset((o) => o + page.length);

    if (page.length < 20) {
      setHasMore(false);
    }
    loadingRef.current = false;
  };

  useEffect(() => {
    loadMore();
  }, [userId]);

  return useMemo(() => ({ orders, hasMore, loadMore }), [orders, hasMore]);
}
