export interface LoginDataModel {
  email: string;
  password: string;
}

export interface RegisterDataModel {
  email: string;
  password: string;
  passwordAgain: string;
  userName: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  userName: string;
}

export interface AccesTokenModel {
  email: string;
  exp: number;
  iat: number;
  isSecondFactorAuthenticated: boolean;
}
