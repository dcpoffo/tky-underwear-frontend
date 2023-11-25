import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
    errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {

    const invalid = !!errorMessage || isInvalid

    return (
        <FormControl mb={4} isInvalid={invalid}>

            <NativeBaseInput
                fontSize={16}
                h={16}                
                borderRadius={10}
                isInvalid={invalid}
                placeholderTextColor="gray.500"

                _focus={{
                    bg: "gray.200",
                    borderWidth: 2,
                    borderColor: "blue.500",
                }}

                _invalid={{
                    borderWidth: 2,
                    borderColor: "red.500"
                }}

                {...rest}
            />
            
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>

        </FormControl>
    )
}