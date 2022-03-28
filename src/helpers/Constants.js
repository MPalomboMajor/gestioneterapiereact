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
  }