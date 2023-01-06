import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "except",
    pure: false
})
export class ExceptPipe<T> implements PipeTransform {
    transform(values: T[], filter: (element: T) => boolean) {
        return values.filter(filter);
    }
}