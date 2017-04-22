export class User {
  constructor(public options?: IUser){
    Object.assign(this, options);
  }
}

interface IUser {
  email: string;
  profile_picture: string;
  username: string;
  uid: string;
}