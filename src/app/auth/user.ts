export class User {

   username: string;
  private role: string;
  private phoneNumber: string;
  private email: string;
  password: string;


  constructor(username: string, role: string, phoneNumber: string, email: string, password: string) {
    this.username = username;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
  }


}
