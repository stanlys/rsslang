interface UserCommon {
  id: string;
  name: string;
  email: string;
  password: string;
  responseStatus: number;
}

interface UserOptionalInformation {
  logo: File;
}

export interface UserSetting {
  wordsPerDay: number;
  optional: UserOptionalInformation;
}

export type User = Omit<UserCommon, 'id' | 'responseStatus'>;

export type UserResponse = Omit<UserCommon, 'password' | 'responseStatus'>;

export type UserDeleted = Pick<UserCommon, 'id' | 'responseStatus'>;

export type UserUpdateData = Pick<UserCommon, 'email' | 'password'>;
