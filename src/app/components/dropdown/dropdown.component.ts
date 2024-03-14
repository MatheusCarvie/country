import { Component, Input, Output, EventEmitter } from "@angular/core";
import { dropdownOptions } from "../../models/dropdown-options";

@Component({
    selector: "app-dropdown",
    standalone: true,
    imports: [],
    templateUrl: "./dropdown.component.html",
    styleUrl: "./dropdown.component.css"
})

export class DropDownComponent{
    @Input({required: true}) placeholder!: string;
    @Input({required: true}) options!: dropdownOptions[];

    @Output() changed = new EventEmitter<string>();

    opening: boolean = false;

    click(): void {
        this.opening = !this.opening;
    }

    clickDefault(event: MouseEvent): void {
        event.stopPropagation();
    }

    clickOptions(option: dropdownOptions){
        const value = option.value;
        this.changed.emit(value);
    }
}