import { AtmType } from "@/types/AtmType"
import { TransportadoraType } from "@/types/TransportadoraType"

export const api = {
    login : async (user : string, password : string) : Promise<{ error : string, token? : string }> => {
        return new Promise(resolve=>{
            setTimeout(()=>{
                if(user !== 'TARCISIOSILVA'){
                    resolve({
                        error : 'E-mail e/ou senha invalidos!'
                    })
                }else{
                    resolve({
                        error : '',
                        token : '12343443'
                    })
                }
            }, 1000)
        })
    },
    getTransportadoras : async () : Promise<TransportadoraType[]> => {
        
        const list : TransportadoraType[] = [
            { id : 1, name : 'Transportadora 1', contaTesouraria : 1231, saldo : 1110.28},
            { id : 2, name : 'Transportadora 2', contaTesouraria : 1232, saldo : 0.0},
            { id : 3, name : 'Transportadora 3', contaTesouraria : 1233, saldo : 5110.28},
            { id : 4, name : 'Transportadora 4', contaTesouraria : 1234, saldo : 10.28},
            { id : 5, name : 'Transportadora 5', contaTesouraria : 1235, saldo : 1110.28},
        ]

        return new Promise(resolve=>{
            setTimeout(()=>{
               resolve(list)
            }, 1000)
        })
    },
    deleteTransportadora : async (id : number) => {
        return new Promise(resolve=>{
            setTimeout(()=>{
               resolve(true)
            }, 1000)
        })
    },
    createTransportadora : async (form : FormData) => {
        return new Promise(resolve=>{
            setTimeout(()=>{
               resolve(true)
            }, 1000)
        })
    },
    updateTransportadora : async (form : FormData) => {
        return new Promise(resolve=>{
            setTimeout(()=>{
               resolve(true)
            }, 1000)
        })
    },
    getAtms : async () : Promise<AtmType[]> => {

        const list : AtmType[] = [
            {id : 1, nome : 'SUPER COHAMA 01', nomeReduzido : 'COHAMA 01', transportadoraResponsavel : {
                    id : 1, name : 'Transportadora 1', contaTesouraria : 1231, saldo : 1110.28 
                }, numeroSerie : 12484},
            {id : 2, nome : 'SUPER COHAMA 02', nomeReduzido : 'COHAMA 02',  transportadoraResponsavel :{ 
                    id : 1, name : 'Transportadora 1', contaTesouraria : 1231, saldo : 1110.28
                },  numeroSerie : 12485},
            {id : 3, nome : 'SUPER TURU 01', nomeReduzido : 'TURU 01', transportadoraResponsavel : { 
                    id : 2, name : 'Transportadora 2', contaTesouraria : 1232, saldo : 0.0
                }, numeroSerie : 12486},
            {id : 4, nome : 'SUPER TURU 02', nomeReduzido : 'TURU 02',  transportadoraResponsavel : { 
                    id : 2, name : 'Transportadora 2', contaTesouraria : 1232, saldo : 0.0
                }, numeroSerie : 12487},
            {id : 5, nome : 'SUPER SANTA INES 01', nomeReduzido : 'S INES 01', transportadoraResponsavel : { 
                    id : 5, name : 'Transportadora 5', contaTesouraria : 1235, saldo : 1110.28
                }, numeroSerie : 12488},
        ];

        return new Promise(resolve=>{
            setTimeout(()=>{
               resolve(list)
            }, 1000)
        })
    },
    deleteAtm : async (id : number) => {
        return new Promise(resolve=>{
            setTimeout(()=>{
               resolve(true)
            }, 1000)
        })
    },
    createAtm : async (form : FormData) => {
        return new Promise(resolve=>{
            setTimeout(()=>{
               resolve(true)
            }, 1000)
        })
    },
    upgradeAtm : async (form : FormData) => {
        return new Promise(resolve=>{
            setTimeout(()=>{
               resolve(true)
            }, 1000)
        })
    }
}