export const utils = {
    formatDateForDatePicker : (date : Date) => {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        return `${day}/${month}/${year}`
    },
    valueInCass : (typeCass : number, valueCass : number) : string => {
        return (valueCass * typeCass).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    },
    totalValueInPedidoInReal : (value10 : number, value20 : number, value50 : number, value100 : number) : string => {
        let value = (value10 * 10) + (value20 * 20) + (value50 * 50) + (value100 * 100) 
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }
}