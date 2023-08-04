import { Data } from "./store";

export function findCities(countries: Data, query: string) {
  let results: Data = [];

  countries.forEach(country => {
    let matchingCities = country.cities.filter(city => city.toLowerCase().startsWith(query.toLowerCase()));
    
    if (matchingCities.length > 0) {
      results.push({
        country: country.country,
        cities: matchingCities.slice(0, 3)
      });
    }
  });

  return results;
}

export function trimStr(str: string, maxLength: number) {
  if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
  } else {
      return str;
  }
}

export function monthToString(monthNumber: number) {
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];
  return months[monthNumber];
}

export const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function calendarFromMonth(monthNumber: number) {

  if (typeof monthNumber !== 'number') return [];

  let days: Array<{ day: number, month: number, status: string, disabled: boolean }> = [];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();

  let date = new Date(currentYear, monthNumber);
  let firstDay = date.getDay() || 7;
  let totalDaysInMonth = new Date(currentYear, monthNumber + 1, 0).getDate();
  for (let i = 1; i < firstDay; i++) {
      days.push({ 
        day: new Date(currentYear, monthNumber, - (firstDay - i)).getDate(), 
        month: monthNumber - 1, 
        status: '', 
        disabled: true 
      });
  }
  for (let i = 1; i <= totalDaysInMonth; i++) {
      let status = '';
      let disabled = false;
      if (monthNumber < currentMonth || (monthNumber === currentMonth && i < currentDay)) {
          disabled = true;
      }
      days.push({ 
        day: i, 
        month: monthNumber, 
        status: status, 
        disabled: disabled 
      });
  }
  let lastDayOfWeek = days[days.length - 1].day;
  let remainingDays = 7 - new Date(currentYear, monthNumber, lastDayOfWeek).getDay();
  for (let i = 1; i <= remainingDays; i++) {
      days.push({ 
        day: i, 
        month: monthNumber + 1, 
        status: '', 
        disabled: true 
      });
  }

  return days.map((d, i) => ({ ...d, id: i }));
}



