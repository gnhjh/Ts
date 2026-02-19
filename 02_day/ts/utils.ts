export class Utils {
  static validName(name: string) {
    return name.length > 3;
  }
  static validEmail(email: string) {
    return email.length >= 3 && email.includes("@") && email.endsWith(".com");
  }

  static validPassword(password: string, repeatPassword: string) {
    return password.length >= 6 && password === repeatPassword;
  }
}
