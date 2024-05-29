export interface userInfo {
    username: string;
    email: string;
    verified: boolean;
    join_date: string;
    logo: string;
    userid: number;
}
export interface signinResponse {
  status: string;
  data: userInfo;
}
