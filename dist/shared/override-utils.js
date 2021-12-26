"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverrideUtils = void 0;
const CryptoJS = require("crypto-js");
const constants_1 = require("../modules/auth/security/constants");
const day_enum_1 = require("./enums/day.enum");
class OverrideUtils {
    static filterArrayByString(mainArr, searchText) {
        if (searchText === '') {
            return mainArr;
        }
        searchText = searchText.toLowerCase();
        return mainArr.filter((itemObj) => {
            return this.searchInObj(itemObj, searchText);
        });
    }
    static encryptPassword(password) {
        return CryptoJS.AES.encrypt(password, constants_1.jwtConstants.secret).toString();
    }
    static dycreptPassword(password) {
        const bytes = CryptoJS.AES.decrypt(password, constants_1.jwtConstants.secret);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
    static searchInObj(itemObj, searchText) {
        for (const prop in itemObj) {
            if (!itemObj.hasOwnProperty(prop)) {
                continue;
            }
            const value = itemObj[prop];
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }
            else if (Array.isArray(value)) {
                if (this.searchInArray(value, searchText)) {
                    return true;
                }
            }
            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    }
    static dayOffDay(dayoff) {
        switch (dayoff) {
            case day_enum_1.Day.Sunday:
                return 7;
            case day_enum_1.Day.Monday:
                return 1;
            case day_enum_1.Day.Tuesday:
                return 2;
            case day_enum_1.Day.Wednesday:
                return 3;
            case day_enum_1.Day.Thursday:
                return 4;
            case day_enum_1.Day.Friday:
                return 5;
            case day_enum_1.Day.Saturday:
                return 6;
        }
    }
    static searchInArray(arr, searchText) {
        for (const value of arr) {
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }
            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    }
    static searchInString(value, searchText) {
        return value.toLowerCase().includes(searchText);
    }
    static generateGUID() {
        function S4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return S4() + S4();
    }
    static toggleInArray(item, array) {
        if (array.indexOf(item) === -1) {
            array.push(item);
        }
        else {
            array.splice(array.indexOf(item), 1);
        }
    }
    static handleize(text) {
        return text
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }
    static distance(lat1, lon1, lat2, lon2, unit) {
        const radlat1 = (Math.PI * lat1) / 180;
        const radlat2 = (Math.PI * lat2) / 180;
        const theta = lon1 - lon2;
        const radtheta = (Math.PI * theta) / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == 'K') {
            dist = dist * 1.609344;
        }
        if (unit == 'N') {
            dist = dist * 0.8684;
        }
        return dist;
    }
}
exports.OverrideUtils = OverrideUtils;
function urlGenerator(url, key, value) {
    const temp = '(?<=' + `${key}` + '=)[^&]+';
    const reg = new RegExp(temp, 'g');
    return url.replace(reg, value);
}
//# sourceMappingURL=override-utils.js.map