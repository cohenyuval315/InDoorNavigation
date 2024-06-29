import AppData from '../data-access/index.js';

export const getAppData = async () => {
    const appData = await AppData.find({})
    return appData;
}   