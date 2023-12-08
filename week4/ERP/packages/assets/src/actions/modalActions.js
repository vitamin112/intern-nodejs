export const modalTypes = {
  DELETE_MODAL: 'DELETE_MODAL',
  CREATE_MODAL: 'CREATE_MODAL',
  EDIT_MODAL: 'EDIT_MODAL'
};

export const changeModalType = (state, type, payload) => {
  switch (type) {
    case modalTypes.CREATE_MODAL:
      return {...state, ...payload};
    case modalTypes.DELETE_MODAL:
      return {...state, ...payload};
    case modalTypes.EDIT_MODAL:
      return {...state, ...payload};
    default:
      return state;
  }
};
