export interface ISearchStrategy {
    search(filter: any): Promise<any>;
}