

export const createTimestamp = (date,withSeperators=false,error=false) => {
    if (!(date instanceof Date)) {
        if(error){
            throw new Error('Invalid date');
        }else{
            return null;
        }
    }
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    if(withSeperators){
        const fullTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return fullTimestamp;
    }else{
        const fullTimestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
        return fullTimestamp
    }
}
