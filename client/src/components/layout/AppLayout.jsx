import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        <Header />
        <WrappedComponent {...props} />
        <div>footer</div>
      </div>
    );
  };
};

export default AppLayout;
