import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any, filter: any, isAnd: boolean): any {
        if (filter && Array.isArray(items)) {
            let filterKeys = Object.keys(filter);

            if (isAnd) {
                return items.filter(item =>
                    filterKeys.reduce((prev, key) =>
                        (prev && new RegExp(filter[key], 'gi').test(item[key])) || filter[key] === "", true));
            } else {
                return items.filter(item => {
                    return filterKeys.some((key) => {
                        return new RegExp(filter[key], 'gi').test(item[key]) || filter[key] === "";
                    });
                });
            }
        } else {
            return items;
        }
    }
}