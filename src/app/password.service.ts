import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private i = 0;

  constructor() {}

  evaluerMotDePasse(motDePasse: string): number {
    let force = 0;

    if (motDePasse.length >= 10) {
      force += 1;
      this.i += 1;
    }
    if (/\d/.test(motDePasse)) {
      force += 1;
    }
    if (/[A-Z]/.test(motDePasse)) {
      force += 1;
    }
    if (/[a-z]/.test(motDePasse)) {
      force += 1;
    }
    if (/[^A-Za-z0-9]/.test(motDePasse)) {
      force += 1;
    }
    return force;
  }

  suggererMotDePasse(result: number): string {
    if (result === 1) {
      return 'Very weak';
    } else if (result === 2) {
      return 'Weak';
    } else if (result === 3 && this.i >= 1) {
      return 'Good';
    } else if (result === 4 && this.i >= 1) {
      return 'Strong';
    } else if (result >= 5) {
      return 'Very Strong';
    }else{
      return 'Please choose a stronger password.';
    }
  }


  genererMotDePasse(motDePasseFaible: string): string {
    const caracteresSpeciaux = '!@#$%^&*()_+[]{}|;:,.<>?';
    const longueurMinimale = 10;
    const longueur = Math.max(longueurMinimale, motDePasseFaible.length);

    const motDePasseFort = Array.from({ length: longueur }, (_, index) => {
      const charFaible = motDePasseFaible.charAt(index % motDePasseFaible.length);
      if (Math.random() > 0.5) {
        const indexCaractereSpecial = Math.floor(Math.random() * caracteresSpeciaux.length);
        return caracteresSpeciaux.charAt(indexCaractereSpecial);
      } else {
        return charFaible;
      }
    }).join('');

    return motDePasseFort;
  }

  calculerPrecisionCaracteres(motDePasse: string): { chiffres: number, speciaux: number } {
    const chiffres = motDePasse.match(/\d/g)?.length || 0;
    const caracteresSpeciaux = motDePasse.match(/[^A-Za-z0-9]/g)?.length || 0;

    return {
      chiffres,
      speciaux: caracteresSpeciaux,
    };
  }

  getCharacterSetSize(password: string): number {
    const uppercaseLetters = /[A-Z]/.test(password) ? 26 : 0;
    const lowercaseLetters = /[a-z]/.test(password) ? 26 : 0;
    const digits = /\d/.test(password) ? 10 : 0;
    const specialCharacters = /[^A-Za-z0-9]/.test(password) ? 32 : 0;

    return uppercaseLetters + lowercaseLetters + digits + specialCharacters;
  }

  calculateTimeToCrack(passwordLength: number, characterSetSize: number, attemptsPerSecond: number): string {
    const numberOfAttempts = Math.pow(characterSetSize, passwordLength);
    const timeInSeconds = numberOfAttempts / attemptsPerSecond;
    const days = Math.floor(timeInSeconds / (24 * 3600));
    const hours = Math.floor((timeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }
}
