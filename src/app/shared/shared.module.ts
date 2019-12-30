import { NgModule } from "@angular/core";
import { DropdownDirective } from "../shared/dropdown.directive";
import { CommonModule } from "@angular/common";
@NgModule({
    declarations: [DropdownDirective],
    imports: [CommonModule],
    exports: [CommonModule, DropdownDirective],
})
export class SharedModule {

}
