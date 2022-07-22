export interface IFindData<T>
{
    status: number,
    response: IResponse<T>
}

export interface IResponse<T>
{
    success: boolean,
    error?: string,
    data?: T
}
