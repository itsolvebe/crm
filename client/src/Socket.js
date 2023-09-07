import io from "socket.io-client";

console.log("sockei :", process.env.REACT_APP_PORT);
const socket = io(`${process.env.REACT_APP_PORT}${process.env.REACT_APP_PORT}`);

export default socket;
