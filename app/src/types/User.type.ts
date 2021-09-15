export type User = {
  _id: number;
  name: string;
  mode: 'admin' | 'user' | 'doctor' | 'tester';
  age: number;
  activeSubscription: boolean;
};
