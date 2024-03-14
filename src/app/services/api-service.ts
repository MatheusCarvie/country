import { Injectable } from "@angular/core";
import { apiInstance } from "./api-instance";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class ApiService {
    constructor() {};

    async getAllCountry() {
        try {
            const response = await apiInstance.get("/all");
            return response.data;
        }catch (error){
            console.error(error);
        }
    }
}