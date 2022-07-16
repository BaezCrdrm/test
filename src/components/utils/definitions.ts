export type CallbackFunction = (...args: any[]) => void;

export interface IEventProp 
{
    name?: string,
    /**
     * Utilizado para evitar utilizar las 
     * funciones que son ocupadas por default
     */
    avoid?: boolean,
    event: CallbackFunction;
}
