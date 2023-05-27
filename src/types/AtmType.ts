import { TransportadoraType } from "./TransportadoraType";

export type AtmType = {
    id : number;
    nome : string;
    nomeReduzido : string;
    transportadoraResponsavel : TransportadoraType;
    numeroSerie : number;
}