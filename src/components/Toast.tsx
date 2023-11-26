import { IToastProps, useToast } from "native-base";

type Props = IToastProps & {
    description: string;
}

const toast = useToast()

export function Toast( {description, ...rest }: Props) {
    return (
        toast.show({
            // description: 'Algo deu errado! Verifique o Usuário e a Senha',
            placement: 'top',
            bg: 'red.500',
            fontSize: 'md'
          })
    )
}