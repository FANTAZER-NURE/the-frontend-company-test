export type Customer = RawCustomer & {
  id: string;
};

export type RawCustomer = {
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  country: string;
  city: string;
  state: string;
  postCode: string;
  street: string;
  streetNumber: string;
};
