import toast from "react-hot-toast";
const Error = ({ children, ...props }) => {

  toast.error(children)
  // return (
  
  //   // <div
  //   //   style={{ color: "#f23838", textAlign: "center", margin: "0.2rem 0" }}
  //   //   {...props}
  //   // >
  //   // </div>
  //   <>
  //   </>

  // );
};

export default Error;
