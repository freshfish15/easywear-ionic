export interface Status {
  id: number;
  avatarname: string;
  gender: string;
  height?: any;
  weight?: any;
}

export interface avatarResponse {
  status: Status[];
}
