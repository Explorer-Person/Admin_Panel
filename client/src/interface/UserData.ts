export interface Users {
  user_id: string;
  username: string;
  password: string;
  email: string;
}

export interface UserDataState {
  AllUserData: Users[];
  AllSuperUserData: Users[];
}

export interface AddUserApiProps {
  users: Users[];
  csrfData: string | undefined;
}

export interface UserLoginDatas {
  username: string;
  password: string;
}

export interface UserLoginApiProps{
    userDatas: UserLoginDatas;
    csrfToken: string | undefined;
}

export interface AuthInfoSliceProps {
  userAuthInfo: UserAuthInfo;
}
export interface UserAuthInfo{
      isAuthUser: boolean,
      rootAccess: boolean,   
}
