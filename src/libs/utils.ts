export const utils = {
    formatDateForDatePicker : (date : Date) => {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        return `${day}/${month}/${year}`
    },
    valueInCass : (typeCass : number, valueCass : string | undefined) : string => {
        if(valueCass === undefined){
            return 'R$  00,00'
        }else{
            return (parseInt(valueCass) * typeCass).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        }
    },
    totalValueInPedidoInReal : (value : number) : string => {
        if(value > 0){
            return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        }else{
            return 'R$ 00,00'
        }
    }
}