import Auth from "../components/Auth";
import Quote from "../components/Quote";

const SignUp = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Auth type="signup" />

      <div className="invisible lg:visible">
        <Quote />
      </div>
    </div>
  );
};

export default SignUp;
