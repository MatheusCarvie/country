import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-input",
    standalone: true,
    imports: [],
    templateUrl: "./input.component.html",
    styleUrl: "./input.component.css",
})

export class InputComponent {
    @Input({required: true}) name!: string;
    @Input({required: true}) icon!: string;
    @Input({required: true}) placeholder!: string;
    @Input() additionalClass?: string;

    @Output() changed = new EventEmitter<string>();

    onChanged(event: Event) {
        const {value} = event.target as HTMLInputElement;
        this.changed.emit(value);
    }
}