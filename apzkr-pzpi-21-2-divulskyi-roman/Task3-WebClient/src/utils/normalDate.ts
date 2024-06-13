export const normalizeDate = (inputDate:string) => {
    const date: Date = new Date(inputDate);
    const options:Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-us', options);
}

export default normalizeDate;