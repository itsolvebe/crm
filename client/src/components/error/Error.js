const Error = ({ children, ...props }) => {
  return (
    <div
      style={{ color: "#f23838", textAlign: "center", margin: "0.2rem 0" }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Error;
