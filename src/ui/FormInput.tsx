import { Input } from "@nextui-org/react";
const FormInput = ({
  placeholder,
  type,
  label,
  field,
  isInvalid,
  errorMsg,
}: {
  placeholder?: string;
  type?: string;
  label?: string;
  field?: any;
  isInvalid?: boolean;
  errorMsg?: string | undefined;
}) => {
  return (
    <Input
      radius="sm"
      label={label}
      type={type}
      isInvalid={isInvalid}
      errorMessage={errorMsg}
      variant="bordered"
      classNames={{
        inputWrapper: ["my-3", "bg-white", "border", "border-black"],
      }}
      placeholder={placeholder}
      {...field}
    />
  );
};

export default FormInput;
