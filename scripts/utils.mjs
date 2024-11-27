export const firstLetterToUpperCase = letter => {
    const str = letter.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const parseFileName = (name, prefix = '') => {
    const nameSplit = name.split('-');
    return `${firstLetterToUpperCase(prefix)}${nameSplit
        .map(n => firstLetterToUpperCase(n))
        .join('')}`;
};
