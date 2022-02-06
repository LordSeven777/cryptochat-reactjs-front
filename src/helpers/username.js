// Extracts the diplayable name for a user
const getUsername = ({ hidden, fullName, firstName, lastName, pseudo }, isExtended = true) => {
  return hidden ? pseudo : fullName ? fullName : `${firstName}${isExtended ? ` ${lastName}` : ""}`;
};

export default getUsername;
