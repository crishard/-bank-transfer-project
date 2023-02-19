export async function passwordValid(password: string) {
    var capitalLetters = /[A-Z]/;
    var numbers = /[0-9]/;
    var auxCapitalLetters = 0;
    var auxNumbers = 0;
  
    for (var i = 0; i < password.length; i++) {
      if (capitalLetters.test(password[i])) {
        auxCapitalLetters++;
      } else if (numbers.test(password[i])) {
        auxNumbers++;
      }
    }
    if (auxCapitalLetters <= 0) {
      return false;
    } else if (auxNumbers <= 0) {
      return false;
    } else {
      return true;
    }
  }