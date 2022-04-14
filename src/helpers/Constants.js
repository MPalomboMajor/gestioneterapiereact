function textFormat(r) {
  return `/${r}/`;
}
export const entities = {
  USER: 'user',
  MEDICO: 'medico',
  
  PATIENT:'patient',
};

export const API = {
  TODOS: textFormat(entities.TODOS),
  USER: textFormat(entities.USER),
  MEDICO: textFormat(entities.MEDICO),
  PATIENT: textFormat(entities.PATIENT),
};

export const entitiesLabels = {
  WARNING: 'Warning!',
  USER: 'Users',
  ERROR: 'Error!',
  SUCCESS: 'Success!',
}
export const message = {
  //ERROR
  ErrorLogin: 'Username o password errati ',
  ErrorServer: 'Errore interno al programma ',
  ErrorRequire: 'Inserire tutti i campi richiesti ',
  ///SUCCESS
  SuccessInsert: 'Inserito correttamente ',
  SuccessUpdate: 'Aggiornato correttamente',
  SuccessSend: 'Inviato Correttamente ',
  ErroSend: 'Non Inviato Correttamente ',
  ///OBJECT
  USER: 'user',
  MEDICO: 'edico ',
  CODICE: 'Codice ',
  PATIENT: 'Paziente ',
  CARMANAGER: 'CarManager '
}
export const notificationType = {
  PRIMARY: 'primary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
}


