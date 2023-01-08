import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "price"  
})
export class PricePipe implements PipeTransform {
    transform(value: number): string {
        return Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value / 100);
    }
}