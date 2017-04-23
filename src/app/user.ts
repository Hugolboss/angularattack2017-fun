export class User {
  profile_picture: string;
  username: string;
  uid: string;
  email: string;
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
