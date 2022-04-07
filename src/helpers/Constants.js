function textFormat(r) {
  return `/${r}/`;
}
export const entities = {
  USER: 'user',
  MEDICO: 'medico'
};

export const API = {
  TODOS: textFormat(entities.TODOS),
  USER: textFormat(entities.USER),
  MEDICO: textFormat(entities.MEDICO),
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

  ///OBJECT
  USER: 'user',
  MEDICO: 'medico ',
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


