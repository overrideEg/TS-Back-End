import { Day } from './enums/day.enum';
export declare class OverrideUtils {
    static filterArrayByString(mainArr: any, searchText: any): any;
    static encryptPassword(password: string): any;
    static dycreptPassword(password: string): any;
    static searchInObj(itemObj: any, searchText: any): boolean;
    static dayOffDay(dayoff: Day): 1 | 2 | 5 | 7 | 3 | 4 | 6;
    static searchInArray(arr: any, searchText: any): boolean;
    static searchInString(value: any, searchText: any): any;
    static generateGUID(): string;
    static toggleInArray(item: any, array: any): void;
    static handleize(text: any): string;
    static distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: 'K' | 'N'): number;
}
