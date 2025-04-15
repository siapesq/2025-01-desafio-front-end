export function formatDate(date: string) {
    if (date == undefined) return '--/--/----'
    const formated = date.slice(0, 10).split('-').reverse().join('/');
    return formated;
}

export function formatTime(time: string) {
    if (time == undefined) return '--:--'
    const formated = time.split(':').slice(0,2).join(':')
    return formated
}

export function formatName(sName: string) {
    if (sName == undefined) return ''
    const formated = sName.split(' ').slice(0,2).join(' ').replaceAll(',', '');
    return formated;
}

export function validateName(name: string) {
    if (name.length > 50) return '---'
    else return name
}

export function formatPlace(country: string, continent: string) {
    if (country == undefined || continent == undefined) return ''
    const formCountry = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()
    const formContinent = continent.charAt(0).toUpperCase() + continent.slice(1).toLowerCase()
    const formated = formCountry + ', ' + formContinent
    return formated
}
