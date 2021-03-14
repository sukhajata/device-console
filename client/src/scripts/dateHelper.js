const getFormattedValue = part => {
    if (part < 10) {
        return `0${part}`;
    }
    return `${part}`
}

export const getUTCString = dd => {
    const formatted = `${dd.getUTCFullYear()}-${getFormattedValue(dd.getUTCMonth() + 1)}-${getFormattedValue(dd.getUTCDate())} ${getFormattedValue(dd.getUTCHours())}:${getFormattedValue(dd.getUTCMinutes())}:${getFormattedValue(dd.getUTCSeconds())}`;
    return formatted;
}

const formatDate = dateString => {
    if (dateString) {
        let dd = new Date(dateString);
        const formatted = `${dd.getFullYear()}-${getFormattedValue(dd.getMonth() + 1)}-${getFormattedValue(dd.getDate())} ${getFormattedValue(dd.getHours())}:${getFormattedValue(dd.getMinutes())}:${getFormattedValue(dd.getSeconds())}`;
        return formatted;
    }

    return "";

}

export const msToDateString = ms => {
    const dd = new Date(ms);
    const utcString = dd.toString();
    return utcString;
}

export const diffMins = msec => {
    const dd = new Date(msec);
    const now = new Date();
    const diffMs = now - dd;
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return diffMins;
}

const fixDateForAllBrowsers = dateString => dateString.replace(/-/g, '/');


export const toNZTime = dateString => {
    if (!dateString) {
        return "";
    }
    const fixed = fixDateForAllBrowsers(dateString);
    const utcMsec = new Date(fixed).getTime();
    const localOffsetMsec = (new Date()).getTimezoneOffset() * 60000;
    const localTimeMsec = utcMsec + localOffsetMsec;
    const newDate = new Date(localTimeMsec);
    //toLocaleString("en-US", {timeZone: "Pacific/Auckland"});
    return newDate.toLocaleString();
}

export const getNZTimeFromUTCString = dateString => {
    if (!dateString) {
        return "";
    }
    const dd = new Date(dateString);
    return dd.toString();
}