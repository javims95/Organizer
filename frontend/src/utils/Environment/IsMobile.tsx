export const IsMobile = (): boolean => {
    const userAgent = navigator.userAgent;
    const mobileKeywords = ["Mobile", "Android", "iPhone", "iPad", "iPod", "BlackBerry", "Windows Phone"];

    for (let keyword of mobileKeywords) {
        if (userAgent.includes(keyword)) {
            return true;
        }
    }

    return false;
};