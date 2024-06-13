import Auth from "../components/Auth";
import Quote from "../components/Quote";

const SignIn = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <Auth type="signin" />

      <div className="max-lg:hidden">
        <Quote />
      </div>
    </div>
  );
};

export default SignIn;
