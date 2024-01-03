import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <main className="flex h-screen items-center justify-center bg-black">
      <div className="space-y-10">
        <div className="font-thin text-white">
          <h1 className="mr-5 text-7xl font-semibold text-danger">404</h1>
          <h1 className="text-5xl">Page Not Found</h1>
        </div>
        <Button
          onPress={() => {
            navigate("/");
          }}
        >
          Redirect to Homepage
        </Button>
      </div>
    </main>
  );
};

export default Error404;
