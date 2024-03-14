import { Component, Input } from "@angular/core";

@Component({
    selector: "app-card",
    standalone: true,
    imports: [],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.css"
})

export class CardComponent {
    @Input({required: true}) name!: string;
    @Input({required: true}) imagePath!: string;
    @Input({required: true}) population!: string;
    @Input({required: true}) region!: string;
    @Input({required: true}) capital!: string;
}