export function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }
  


export function isStrongPassword(password) {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,32}$/;
  return strongRegex.test(password);
}
