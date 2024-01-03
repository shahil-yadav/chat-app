import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import FormInput from "../../ui/FormInput";
import { useCreateAccount } from "../../lib/tanstack/Mutations/useCreateAccount";

interface Isign_up {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      name: "",
      email: "",
    },
  });
  const accountCreate = useCreateAccount();

  const onSubmit: SubmitHandler<Isign_up> = (data) => {
    accountCreate.mutate(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="name"
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <FormInput
            field={field}
            isInvalid={!!errors.name}
            errorMsg={errors.name && "Please provide your name"}
            label="Name"
            type="text"
          />
        )}
      />

      <Controller
        name="email"
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
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
        isLoading={accountCreate.isPending}
        fullWidth={true}
        className="bg-lime-400"
      >
        Submit
      </Button>
    </form>
  );
};

export default Signup;

/* const Signup = ({
  setOption,
}: {
  setOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const accountSignUp = useCreateAccount();
  return (
    <>
      <div className="h-1/2 flex items-end pb-20">
        <h1 className="text-5xl font-semibold">SignUp to continue</h1>
      </div>
      <div className="h-1/2">
        <div
          className="flex flex-col w-[350px]
  flex-wrap md:flex-nowrap gap-4"
        >
          <Input
            type="text"
            label="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="ghost"
            radius="full"
            color="primary"
            isLoading={accountSignUp.isPending}
            onPress={() => {
              if (!name || !email || !password) return;
              accountSignUp.mutate({ name, email, password });
            }}
          >
            Sign Up
          </Button>

          <div className="flex items-center justify-between">
            <span>Already have an account...</span>
            <Button
              variant="light"
              onPress={() => setOption('login')}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
*/
