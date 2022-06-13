export interface IAccountsValidate {
  user: IAccountsUser;
  session: {
    id: string;
  };
  redirectTo?: string;
  isSupport?: boolean;
  supportId?: number;
}

export interface IAccountsUser {
  phones: string[];
  eduzzIds: number[];
  nutrorIds: number[];
  isProducer: boolean;
  isAffiliate: boolean;
  name: string;
  email: string;
  document: string;
  picture: string;
  id: string;
}
