
import { isAfter, isSameDay, parseISO } from 'date-fns';

type typeField = 'ID' | 'name' | 'description' | 'logo' | 'releaseDate';

export const validateInputs = (field: typeField, value: string): boolean => {

    if(field === 'ID') {
        if(value.length < 3) return true;
        if(value.length > 10) return true;
    }

    if(field === 'name') {
        if(value.length < 5) return true;
        if(value.length > 100) return true;
    }

    if(field === 'description') {
        if(value.length < 10) return true;
        if(value.length > 200) return true;
    }
    
    if(field === 'logo') {
        if(!value) return true;
    }

    if(field === 'releaseDate') {
        const currentDate = new Date();
        const inputDate = parseISO(value);
        return !isAfter(inputDate, currentDate) && !isSameDay(inputDate, currentDate);
    }

    return false;
}