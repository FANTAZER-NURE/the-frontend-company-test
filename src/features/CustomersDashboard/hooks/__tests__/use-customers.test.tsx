import { renderHook, act } from '@testing-library/react';
import { useCustomers } from '../use-cutomers';

describe('useCustomers', () => {
  it('filters by partial country and case-insensitive gender', () => {
    const { result } = renderHook(() => useCustomers());

    act(() => result.current.setCountry('land'));
    const landCount = result.current.customers.length;
    expect(landCount).toBeGreaterThan(0);

    act(() => result.current.setGender('female'));
    const femaleLand = result.current.customers;
    expect(femaleLand.every((c) => c.gender.toLowerCase() === 'female')).toBe(
      true
    );
  });
});
