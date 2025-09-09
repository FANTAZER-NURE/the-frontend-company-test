import { api } from '@/api/customers';
import { useParams } from 'react-router-dom';

export const useCustomer = () => {
  const { userId } = useParams();
  
  // in real world case I would use useQuery from react-query to fetch the customer
  const customer = userId ? api.getCustomer(userId) : undefined;
  const error = !userId
    ? 'Missing user id'
    : !customer
      ? 'Customer not found'
      : null;
  return { customer, error } as const;
};
