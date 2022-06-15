import IAuthToken from '@my-eduzz/shared/interfaces/auth/token';

export interface ITokenResponseDto {
  user: IAuthToken;
  token: string;
}
