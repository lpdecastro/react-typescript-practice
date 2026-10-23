export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
