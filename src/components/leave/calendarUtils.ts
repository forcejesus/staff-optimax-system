
// French localization data
export const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

export const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

// Function to get the number of days in a month
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Function to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};
