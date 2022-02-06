import { createContext } from "react";

const authUserContext = createContext({
  socketIsSetup: false,
  authUser: {
    userID: 1,
    firstName: "John",
    lastName: "Doe",
    gender: "M",
    pseudo: "johnDoe23",
    photo: "http://localhost:5000/users/photos/1.jpg",
    email: "johnDoe@gmail.com",
    online: 1,
    hidden: 0
  },
  setUpSocket: () => {},
  setAuthUser: () => {}
});

export default authUserContext;
