import { Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react";

export default function SuggestionSearch({
  label,
  data,
  toAccess,
  setValue,
  value,
}: {
  label: string;
  data: any;
  toAccess: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}) {
  if (!data) {
    return <Spinner />;
  }
  return (
    <Autocomplete
      label={label}
      size="md"
      className="max-w-xs"
      classNames={{
        clearButton: "text-white",
        selectorButton: "text-white",
        popoverContent: ["bg-white/20", "text-white"],
      }}
      inputProps={{
        classNames: {
          inputWrapper: [
            "bg-black",
            "data-[hover=true]:bg-white/10",
            "group-data-[focus=true]:bg-white/10",
          ],
          input: "group-data-[has-value=true]:text-white",
        },
      }}
      allowsCustomValue
      defaultItems={data}
      selectedKey={value}
      onSelectionChange={setValue}
    >
      {(item) => (
        <AutocompleteItem key={item[toAccess]} value={item[toAccess]}>
          {item[toAccess]}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
