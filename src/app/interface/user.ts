export interface User {
  userID: number;
  username: string;
  email: string;
  phone: string;
  address: string;
}

interface Data {
  user: User;
}

export interface getUser {
  status: string;
  data: Data;
}
