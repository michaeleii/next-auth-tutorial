function ProfilePage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            name=""
            id=""
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">New password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            name=""
            id=""
          />
        </div>
        <div className="form-control mt-5">
          <button className="btn btn-primary">Change password</button>
        </div>
      </form>
    </div>
  );
}
export default ProfilePage;
