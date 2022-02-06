// Refactors a full user's data to its publically viewable data format
const refactorUser = _user => {
  const user = { ..._user };
  if (user.hidden) {
    delete user["firstName"];
    delete user["lastName"];
    delete user["gender"];
    delete user["photoURL"];
  } else delete user["pseudo"];
  delete user["email"];
  delete user["registrationDate"];
  return user;
};

export default refactorUser;
