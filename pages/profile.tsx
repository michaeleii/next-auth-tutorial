import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRef } from "react";

function ProfilePage() {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!oldPasswordRef.current || !newPasswordRef.current) return;

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    const res = await fetch("/api/user/change-password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      }),
    });

    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="max-w-7xl mx-auto p-5 mt-10">
      <h1 className="text-5xl font-bold text-center mb-10">
        Your User Profile
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Old password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            ref={oldPasswordRef}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">New password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            ref={newPasswordRef}
          />
        </div>
        <div className="form-control mt-5">
          <button className="btn btn-primary">Change password</button>
        </div>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default ProfilePage;
