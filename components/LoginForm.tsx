import { useRef, useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(email: string, password: string) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInputRef.current || !passwordInputRef.current) return;

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      if (result && !result.error) router.replace("/profile");
      console.log(result);
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
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
        <input
          type="email"
          className="input input-bordered"
          ref={emailInputRef}
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Your password</span>
        </label>
        <input
          type="password"
          className="input input-bordered"
          ref={passwordInputRef}
        />
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
