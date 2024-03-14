import { Component } from "@angular/core";
import { DarkModeComponent } from "../dark-mode/dark-mode.component";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [DarkModeComponent],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css"
})

export class HeaderComponent {}