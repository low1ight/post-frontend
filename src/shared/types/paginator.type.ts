

export type PaginatorType<T> = {
    pageNumber: number,
    pageSize:number,
    totalItemsCount:number,
    items: T[]
}