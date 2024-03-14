export type country = {
    name: string,
    imagePath: string
    population: number,
    region: string,
    capital: string,
    details: detailsCountry
}

type detailsCountry = {
    nativeName: string,
    subRegion: string,
    topLevelDomain: string,
    currencies: string,
    languages: languages[]
    borderCountries: borderCountries[]
}

type languages = {
    name: string
}

type borderCountries = {
    name: string
}