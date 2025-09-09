import { api } from '@/api/customers';
import type { Customer } from '@/types/customer';
import type { Filter } from '@/types/filters';
import { useCallback, useMemo, useState } from 'react';

export const useCustomers = () => {
  const [customers] = useState<Customer[]>(() => api.getCustomers());
  const [filters, setFilters] = useState<Filter>({
    gender: null,
    country: null,
    search: '',
  });

  const setGender = useCallback((gender: string | null) => {
    setFilters((prev) => ({ ...prev, gender }));
  }, []);

  const setCountry = useCallback((country: string | null) => {
    setFilters((prev) => ({ ...prev, country }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const visibleCustomers = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return customers.filter((c) => {
      if (
        filters.gender &&
        c.gender.toLowerCase() !== filters.gender.toLowerCase()
      ) {
        return false;
      }
      if (filters.country) {
        const countryNeedle = filters.country.toLowerCase();
        if (!c.country.toLowerCase().includes(countryNeedle)) return false;
      }
      if (normalizedSearch.length > 0) {
        const haystack =
          `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase();
        if (!haystack.includes(normalizedSearch)) return false;
      }
      return true;
    });
  }, [customers, filters.country, filters.gender, filters.search]);

  const resetFilters = useCallback(() => {
    setFilters({ gender: null, country: null, search: '' });
  }, []);

  return {
    customers: visibleCustomers,
    filters,
    setGender,
    setCountry,
    setSearch,
    resetFilters,
  };
};
