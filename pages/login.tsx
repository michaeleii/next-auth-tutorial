import LoginForm from "@/components/LoginForm";
import { authOptions } from "@/services/auth";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";

function LoginPage() {
  return (
    <div className="max-w-xl mx-auto p-5 mt-10">
      <div className="card bg-neutral">
        <LoginForm />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default LoginPage;
