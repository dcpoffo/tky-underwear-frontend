import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
    errorMessage?: string | null;
}

export function Input({ errorMessage = null, ...rest }: Props) {

    

    return (
        <FormControl mb={4} isInvalid >
            <NativeBaseInput
                fontSize={14}
                fontWeight={"bold"}
                color='white'
                h={16}                
                bg={'gray.500'}
                borderRadius={10}

                _focus={{
                    bg: "gray.200",
                    borderWidth: 2,

                }}

                _invalid={{
                    borderWidth: 2
                }}

                {...rest}
            />

                <FormControl.ErrorMessage>
                    Informe o nome
                </FormControl.ErrorMessage>

        </FormControl>
    )
}