import { Component, OnInit } from '@angular/core';
import { PasswordService } from './../password.service';

@Component({
  selector: 'app-analyserpwd',
  templateUrl: './analyserpwd.component.html',
  styleUrls: ['./analyserpwd.component.css']
})
export class AnalyserpwdComponent implements OnInit{

  motDePasse: string = '';
  suggestion: string = '';
  motDePasseFort: string = '';
  afficherMotDePasse: boolean = false;
  longueurMotDePasse: number = 0;
  precisionChiffres: number = 0;
  precisionSpeciaux: number = 0;
  estimatedCrackTime: string = '';

  constructor(private passwordService: PasswordService) {}

  ngOnInit(): void {
  }
  evaluerMotDePasse() {
    const forceMotDePasse = this.passwordService.evaluerMotDePasse(this.motDePasse);
    this.suggestion = this.passwordService.suggererMotDePasse(forceMotDePasse);
    this.motDePasseFort = '';
    this.calculerLongueurEtPrecision();
    this.calculerEstimatedCrackTime();
  }

  genererMotDePasseFort() {
    this.motDePasseFort = this.passwordService.genererMotDePasse(this.motDePasse);
  }

  toggleAffichageMotDePasse() {
    this.afficherMotDePasse = !this.afficherMotDePasse;
  }

  private calculerLongueurEtPrecision() {
    this.longueurMotDePasse = this.motDePasse.length;
    const { chiffres, speciaux } = this.passwordService.calculerPrecisionCaracteres(this.motDePasse);
    this.precisionChiffres = chiffres;
    this.precisionSpeciaux = speciaux;
  }

  private calculerEstimatedCrackTime() {
    const passwordLength = this.motDePasse.length;
    const characterSetSize = this.passwordService.getCharacterSetSize(this.motDePasse);
    const attemptsPerSecond = 100000000;

    this.estimatedCrackTime = this.passwordService.calculateTimeToCrack(passwordLength, characterSetSize, attemptsPerSecond);
  }
}
