type GenericObject = { [key: string]: any };
import * as CryptoJS from 'crypto-js';
import { jwtConstants } from '../modules/auth/security/constants';
import { Day } from './enums/day.enum';

export class OverrideUtils {
  /**
   * Filter array by string
   *
   * @param mainArr
   * @param searchText
   * @returns {any}
   */
  public static filterArrayByString(mainArr, searchText): any {
    if (searchText === '') {
      return mainArr;
    }

    searchText = searchText.toLowerCase();

    return mainArr.filter((itemObj) => {
      return this.searchInObj(itemObj, searchText);
    });
  }

  static encryptPassword(password: string) {
    return CryptoJS.AES.encrypt(password, jwtConstants.secret).toString();
  }
  static dycreptPassword(password: string) {
    const bytes = CryptoJS.AES.decrypt(password, jwtConstants.secret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Search in object
   *
   * @param itemObj
   * @param searchText
   * @returns {boolean}
   */
  public static searchInObj(itemObj, searchText): boolean {
    for (const prop in itemObj) {
      if (!itemObj.hasOwnProperty(prop)) {
        continue;
      }

      const value = itemObj[prop];

      if (typeof value === 'string') {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
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

  public static dayOffDay(dayoff: Day) {
    switch (dayoff) {
      case Day.Sunday:
        return 7;
      case Day.Monday:
        return 1;
      case Day.Tuesday:
        return 2;
      case Day.Wednesday:
        return 3;
      case Day.Thursday:
        return 4;
      case Day.Friday:
        return 5;
      case Day.Saturday:
        return 6;
    }
  }
  /**
   * Search in array
   *
   * @param arr
   * @param searchText
   * @returns {boolean}
   */
  public static searchInArray(arr, searchText): boolean {
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

  /**
   * Search in string
   *
   * @param value
   * @param searchText
   * @returns {any}
   */
  public static searchInString(value, searchText): any {
    return value.toLowerCase().includes(searchText);
  }

  /**
   * Generate a unique GUID
   *
   * @returns {string}
   */
  public static generateGUID(): string {
    function S4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return S4() + S4();
  }

  /**
   * Toggle in array
   *
   * @param item
   * @param array
   */
  public static toggleInArray(item, array): void {
    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item), 1);
    }
  }

  /**
   * Handleize
   *
   * @param text
   * @returns {string}
   */
  public static handleize(text): string {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::                                                                         :::
  //:::  This routine calculates the distance between two points (given the     :::
  //:::  latitude/longitude of those points). It is being used to calculate     :::
  //:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
  //:::                                                                         :::
  //:::  Definitions:                                                           :::
  //:::    South latitudes are negative, east longitudes are positive           :::
  //:::                                                                         :::
  //:::  Passed to function:                                                    :::
  //:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
  //:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
  //:::    unit = the unit you desire for results                               :::
  //:::           where: 'M' is statute miles (default)                         :::
  //:::                  'K' is kilometers                                      :::
  //:::                  'N' is nautical miles                                  :::
  //:::                                                                         :::
  //:::  Worldwide cities and other features databases with latitude longitude  :::
  //:::  are available at https://www.geodatasource.com                         :::
  //:::                                                                         :::
  //:::  For enquiries, please contact sales@geodatasource.com                  :::
  //:::                                                                         :::
  //:::  Official Web site: https://www.geodatasource.com                       :::
  //:::                                                                         :::
  //:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
  //:::                                                                         :::
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  public static distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: 'K' | 'N',
  ) {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
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

function urlGenerator(url, key, value) {
  const temp = '(?<=' + `${key}` + '=)[^&]+';
  const reg = new RegExp(temp, 'g');
  // change the value for given key
  return url.replace(reg, value);
}
