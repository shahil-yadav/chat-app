import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useSignIn } from "../../lib/tanstack/Mutations/useSignIn";
import FormInput from "../../ui/FormInput";

interface Isign_in {
  email: string;
  password: string;
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const login = useSignIn();

  const onSubmit: SubmitHandler<Isign_in> = (data) => {
    login.mutate(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="email"
        rules={{
          required: true,
          pattern: /^\S+@\S+$/i,
        }}
        control={control}
        render={({ field }) => (
          <FormInput
            field={field}
            isInvalid={!!errors.email}
            errorMsg={errors.email && "Please enter a valid email"}
            label="Email"
            type="email"
          />
        )}
      />

      <Controller
        name="password"
        rules={{ required: true, minLength: 8 }}
        control={control}
        render={({ field }) => (
          <FormInput
            field={field}
            isInvalid={!!errors.password}
            errorMsg={
              errors.password && "Please enter a password that is 8 digit long"
            }
            label="Password"
            type="password"
          />
        )}
      />

      <Button
        type="submit"
        isLoading={login.isPending}
        fullWidth={true}
        className="bg-lime-400"
      >
        Sign In
      </Button>
    </form>
  );
};

export default Login;

/*const Login = ({
  setOption,
}: {
  setOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const accountSignIn = useSignIn();
  return (
    <>
      <div className="h-1/2 flex items-end pb-20">
        <h1 className="text-5xl font-semibold">Login to continue</h1>
      </div>
      <div className="h-1/2">
        <div
          className="flex flex-col w-[350px]
  flex-wrap md:flex-nowrap gap-4"
        >
          <Input
            type="email"
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type="password"
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            radius="full"
            variant="ghost"
            color="primary"
            isLoading={accountSignIn.isPending}
            onPress={() => {
              if (!email || !password) return;
              accountSignIn.mutate({ email, password });
            }}
          >
            Login
          </Button>

          <div className="flex justify-between items-center">
            <span>Don't have an account then ...</span>
            <Button
              variant="light"
              onPress={() => setOption('sign-up')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
*/
