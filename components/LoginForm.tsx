import { useState } from "react";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className="card-body" onSubmit={handleSubmit}>
      <h2 className="card-title justify-center text-3xl mb-3">
        {isLogin ? "Login" : "Register"}
      </h2>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Your email</span>
        </label>
        <input type="email" className="input input-bordered" name="" id="" />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Your password</span>
        </label>
        <input type="password" className="input input-bordered" name="" id="" />
      </div>
      <div className="form-control mt-5">
        <button className="btn btn-primary">
          {isLogin ? "Login" : "Create new account"}
        </button>
      </div>
      <div className="divider">OR</div>
      <div className="form-control">
        <button
          className="btn btn-outline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create a new account" : "Login with an existing account"}
        </button>
      </div>
    </form>
  );
}
export default LoginForm;
