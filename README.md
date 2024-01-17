# AngularUno per NTT Data

Il progetto è stato svolto con [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Server di sviluppo

Per far funzionar in locale l'app sarà necessario scaricare il file .zip o clonare la repo da VS Code poi entrando nella console (Ctrl+Shift+ò) scrivere il comando `npm i` ed al termine dell'installazione `ng serve`. 
Navigare dunque al `http://localhost:4200/`. 

## Navigazione nel sito

La prima pagina sarà quella di Login, al quale si viene re-indirizzati automaticamente attraverso l'Auth Guard
![LOGIN](https://github.com/AleDeb93/ProjectOne-Angular/assets/121309726/a3893af4-7d79-45eb-8315-0ae5a39b5c8b)

Una volta inserito il token l'applicazione effettuerà una chiamata di test alle API per verificare la validità dello stesso e da quel momento sarà possibile navigare sul portale

## Testing

Come richiesto dalle specifiche i test coprono almeno il 60% di quanto prodotto.
Per effettuare test o controllare il Coverage Summary in console inserire il comando `ng test  --code-coverage` tests via [Karma](https://karma-runner.github.io).

![code-coverage](https://github.com/AleDeb93/ProjectOne-Angular/assets/121309726/1e330040-13d1-4758-a4c0-f499c3f3f8a5)


## Further help

Per maggiori dettagli o aiuti usare `ng help` o controllare la documentazione [Angular CLI Overview and Command Reference](https://angular.io/cli).
