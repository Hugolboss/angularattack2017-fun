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

//// Refactored
// export class User {
//   constructor(
//     public email: string,
//     public profile_picture: string,
//     public username: string,
//     public uid: string,
//   ){ }
// }