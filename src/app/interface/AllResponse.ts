export const enum Status {
    ok = 'ok',
    failed = 'failed'
}

interface RootResponse<Data> {
    status: Status;
    data: Data;
}


export interface FailedData{
    message: string;
}

export interface SimpleResponse extends RootResponse<{
    message?: string;
}> {}


export interface EmailVeriSucessData{
    verification: number;
}
export interface emailVeriResponse extends RootResponse<{
  verification?: number;
}> {}

export interface clothDetailResponse extends RootResponse<{
  name?: string;
  brand?: string;
  price?: number;
}> {}


export interface UserInfo4Upload {
    user_id?: number;
    nickname: string;
    email: string;
    password?: string;
    phone: string;
    address: string;
  }

export interface UserChangedInfo4Upload {
  token?: string;
  email?: string;
  nickname: string;
  phone: string;
  address: string;
}

// TODO: 建议分为PublicUserInfo、PrivateUserInfo
export interface UserInfo {
    id: number;
    email: string;
    nickname: string;
    password?: string;
    name?: string;
    is_verified?: boolean;
    join_date?: string;
    phone?: string;
    address?: string;
    logo_path?: string;
}


export interface UserInfoResponse extends RootResponse<{
    user_info?: UserInfo;
    message?: string;
}> {}
export interface UserInfoSuccessData{
    user_info: UserInfo;
    message: string;
}


export interface TokenResponse extends RootResponse<{
    access_token?: string;
    token_type?: string;
    message?: string;
}> {}
export interface TokenSuccessData {
    access_token: string;
    token_type: string;
}


export interface PasswordResponse extends RootResponse<{
    message?: string;
}> {}
interface PasswordSuccessData {}

export interface AvatarInfo {
    id: number;
    name: string;
    gender: string;
    height?: any;
    weight?: any;
    neck?: any;
    shoulder?: any;
    bust?: any;
    chest?: any;
    waist?: any;
    upperarm?: any;
    sleeve?: any;
    hips?: any;
    outseam?: any;
    thigh?: any;
    calf?: any;
}
export interface AvatarResponse extends RootResponse<{
    avatar_list?: AvatarInfo[];
    message?: string;
}> {}
export interface AvatarSuccessData{
    avatar_list: AvatarInfo[];
}



// TODO 不是很懂为什么要回传password和text1,建议使用PasswordResponse
export interface OldPasswordResponse extends RootResponse<{
    text1?: string;
    message?: string;
    password : string;
}> {}
export interface OldPasswordFailedData extends FailedData{
    text1: string;
    password: string;
}

export interface MeasureInfo4Upload {
  height: number
  weight: number
  frontpic: string
  sidepic: string
  sizes: string
  measureType: number
  measureName: string
  user_email?: string
  gender: string

  // sizes: Array<{
  //   sizeCode: string,
  //   sizeCmVal: number,
  // }>;
}

export interface fittingroom_item{

   id: number;
   name: string;
   category_id: number;
   price: number;
   image_path: string;
   brand: string;
   description: string

}




export interface ClothInfo {
    id: number;
    name: string;
    category_id: number;
    price: number;
    image_path: string;
    brand: string;
    description: string;
}
export interface ClothListResponse extends RootResponse<{
    cloth_list?: ClothInfo[];
}> {}
export interface uploadMeasureResponse extends RootResponse<{

}>{}
