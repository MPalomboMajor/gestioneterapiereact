function textFormat(r) {
    return `/${r}/`;
  }
export const entities = {
    USER: 'user'
  };

export const API = {
    TODOS: textFormat(entities.TODOS),
    USER: textFormat(entities.USER),
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
    ErrorServer:'Errore interno al programma ',
    ErrorRequire:'Inserire tutti i campi richiesti ',
  ///SUCCESS
    SuccessInsert:'Inserito correttamente ',

  ///OBJECT
  USER : 'User ',
  MEDICO : 'Medico ',
  PATIENT:'Paziente ',
  CARMANAGER:'CarManager '
  }
  export const notificationType = {
    PRIMARY: 'primary',
    SUCCESS: 'success',
    DANGER: 'danger',
    WARNING: 'warning',
    INFO: 'info',
    }

  
