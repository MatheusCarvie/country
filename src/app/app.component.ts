import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { InputComponent } from './components/input/input.component';
import { DropDownComponent } from './components/dropdown/dropdown.component';
import { dropdownOptions } from './models/dropdown-options';
import { country } from './models/country';
import { ApiService } from './services/api-service';

type filterType = {
  country: string,
  region: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CardComponent, InputComponent, DropDownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, DoCheck {
  constructor(private apiService: ApiService) { }

  title = 'challenge';
  loading: boolean = false;
  filter: filterType = {country: "", region: ""};
  //filter: {name: string, region: string};
  name: string = "";
  region: string = "";

  options: dropdownOptions[] = [
    {label: "Africa", value: "Africa"},
    {label: "America", value: "America"},
    {label: "Asia", value: "Asia"},
    {label: "Europe", value: "Europe"},
    {label: "Oceania", value: "Oceania"},
  ]

  countryList: country[] = [];

  filteredCountryList: country[] = [];
  savedCountryList: country[] = [];

  async ngOnInit() : Promise<void> {
   this.getAllCountry();
  }

  ngDoCheck(): void {
    console.log("Mudou algo");
  }

  async getAllCountry() {
    try {
      this.loading = true;
      const data = await this.apiService.getAllCountry();
      //console.log(data);

      let tempList: country[] = [];

      for (const item of data) {
        const currentCountry: country = {
          name: item.name.common,
          imagePath: item.flags.png,
          population: item.population,
          region: item.region,
          capital: item.capital,
          details: {
            nativeName: item.name.nativeName,
            subRegion: item.subregion,
            topLevelDomain: item.tld,
            currencies: item.currencies,
            languages: item.languages,
            borderCountries: []
          }
        }

        tempList.push(currentCountry);
      }

      tempList.filter((country) => {
        const countryFilter = country.name.toLocaleLowerCase().includes(this.name.toLocaleLowerCase());
        const regionFilter = country.region.toLocaleLowerCase().includes(this.region.toLocaleLowerCase());
  
        return countryFilter && regionFilter;
      });

      this.countryList = tempList;

      // this.filteredCountryList = tempList;
      // this.savedCountryList = tempList;
      //console.log(this.countryList);
    }catch(error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  doFilter(){
    this.countryList.filter((country) => {
      const countryFilter = country.name.toLocaleLowerCase().includes(this.filter.country.toLocaleLowerCase());
      const regionFilter = country.region.toLocaleLowerCase().includes(this.filter.region.toLocaleLowerCase());

      return countryFilter && regionFilter;
    });
  }

  setCountry(value: string) {
    // this.filter.country = value;
    this.name = value;
    console.log(this.name);
    this.getAllCountry();
    // this.doFilter();
  }

  setRegion(value: string){
    // this.filter.region = value;
    this.region = value;
    console.log(this.region);
    this.getAllCountry();
    // this.doFilter();
  }

  // useEffect(() => {
  //   doFilter();
  // }, [country, region])

  // filterCountryByRegion(value: string){
  //   const lowerValue = value.toLowerCase();
  //   this.filteredCountryList = this.countryList.filter(country => country.region.toLocaleLowerCase().includes(lowerValue));
  //   console.log("Value: ", value, " Lower: ", lowerValue);
  // }

  // filterCoutryByName(value: string) {
  //   const lowerValue = value.toLowerCase();
  //   this.filteredCountryList = this.countryList.filter(coutry => coutry.name.toLocaleLowerCase().includes(lowerValue));
  //   console.log("Value: ", value, " Lower: ", lowerValue);
  // }
}
