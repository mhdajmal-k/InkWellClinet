export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  profilePicture?: string;
  dob: Date;
  articlePreferences: string[];
}
export interface IUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob: string;
  // articlePreferences: string[];
}
