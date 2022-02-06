import io from "socket.io-client";
import DOMAIN from "./config/network-config.js";

let ioObject = {
  // The (client-side) socket instance
  socket: null,

  // Initating our server-side socket setup
  initServerSocketSetup(authUser) {
    const socket = this.socket;
    new Promise(function(resolve, reject) {
      socket.emit("setup-init", authUser, msg => {
        // console.log(msg);
        resolve();
      });
    });
  },

  // Creates a socket instance
  async createSocketInstance() {
    const ENDPOINT = DOMAIN;
    try {
      this.socket = io(ENDPOINT, {
        transports: ["websocket"]
      });
    } catch (e) {
      throw e;
    }

    // Waiting for the server's sign of our connection
    await new Promise((resolve, reject) => {
      this.socket.on("connect", () => {
        // console.log("Socket connected"); // true
        resolve();
      });
    });
  }
};

// export default socket;
export default ioObject;
