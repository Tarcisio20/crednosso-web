import { OperationType } from "./OperationType";
import { TransportadoraType } from "./TransportadoraType";
import { TypesPedidoType } from "./TypesPedidoType";

export type PedidoType = {
    id : number;
    typeOperation : OperationType;
    origin : TransportadoraType;
    destiny : TransportadoraType;
    data : Date;
    typePedido : TypesPedidoType;
    value10 : number;
    value20 : number;
    value50 : number;
    value100 : number;
    obs : string;
}