import { Obj } from 'interfaces/common';
import * as dateFns from 'date-fns';
import { toast } from 'react-toastify';

export const BASE_URI = 'http://127.0.0.1:8002/';

export const configHeaderAxios = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, access-control-allow-origin, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  },
};

export const BASE_IMAGE_URL = 'https://drive.google.com/uc?export=view&id=';

export const handleError = (error: Error) => {
  console.log(error);
};

export const notificationSuccess = (params: Obj) => {
  toast.success(params.content, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notificationError = (params: Obj, timeClose?: number) => {
  toast.error(params.content, {
    position: 'top-right',
    autoClose: timeClose ? timeClose : 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export enum FIELD_VALID {
  NUMBER = 'NUMBER',
  TEXT = 'TEXT',
  MAIL = 'MAIL',
  PHONE = 'PHONE',
  ID = 'ID',
}

export const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneNumberRegex = /^\d{10}$/;
export const idRegex = /[0-9]{9}/;

export const notificationErrorValidate = (
  value: any,
  type?: FIELD_VALID,
  name?: string,
  limitCharacter?: number,
  isRequire = true
) => {
  let pass = true;
  if (isRequire === true) {
    if (isBlank(value)) {
      notificationError({ content: `Không được để trống ${name}` }, 10000);
      pass = false;
    } else {
      if (type === FIELD_VALID.NUMBER) {
        if (value <= 0) {
          notificationError({ content: `${name} phải lớn hơn 0` }, 10000);
          pass = false;
        }
      } else if (type === FIELD_VALID.MAIL) {
        if (!mailRegex.test(value)) {
          notificationError({ content: `Sai đinh dạng email` }, 10000);
          pass = false;
        }
      } else if (type === FIELD_VALID.PHONE) {
        if (!phoneNumberRegex.test(value)) {
          notificationError({ content: `Sai đinh dạng SDT` }, 10000);
          pass = false;
        }
      } else if (type === FIELD_VALID.ID) {
        if (!idRegex.test(value)) {
          notificationError({ content: `Sai đinh dạng CMND` }, 10000);
          pass = false;
        }
      }
      if (limitCharacter && value.length < limitCharacter) {
        console.log(value.length);
        notificationError({ content: `${name} phải cố số ký tự lớn hơn ${limitCharacter}` }, 10000);
        pass = false;
      }
    }
  } else {
    if (type === FIELD_VALID.TEXT) {
      if (limitCharacter && value.length < limitCharacter) {
        notificationError({ content: `${name} phải cố số ký tự lớn hơn ${limitCharacter}` }, 10000);
        pass = false;
      }
    }
  }

  return pass;
};

export enum REGISTER_TYPE {
  CLIENT = 'CLIENT',
  OWNER_SHOP = 'OWNER_SHOP',
}

export enum USER_ROLE {
  OWNER_SHOP = 1,
  CLIENT = 2,
  ADMIN = 3,
}

export const formatNumber = (
  value?: number,
  digit?: number,
  offsetRate?: number,
  toFixed?: boolean,
  failoverValue: string = '0'
) => {
  if (value == null || isNaN(value)) {
    return failoverValue;
  }

  if (offsetRate != null) {
    value = value / offsetRate;
  }

  let tempValueString = value.toString();
  let prefix = '';

  if (tempValueString[0] === '-') {
    prefix = '-';
    tempValueString = tempValueString.substring(1, tempValueString.length);
  }

  try {
    const tempValue = Number(tempValueString);
    let fractionDigit = 0;
    if (digit != null) {
      fractionDigit = digit;
    }
    if (fractionDigit > 0) {
      const temp = +`${Math.round(Number(`${Number(tempValue.toString())}e+${fractionDigit}`))}e-${fractionDigit}`;
      let fractionString = '';
      let i = '';
      if (toFixed === true) {
        i = temp.toFixed(fractionDigit);
        fractionString = i.substring(i.indexOf('.'), i.length);
        i = i.substring(0, i.indexOf('.'));
      } else {
        i = temp.toString();
        if (temp.toString().indexOf('.') > 1) {
          fractionString = temp.toString().substring(temp.toString().indexOf('.'), temp.toString().length);
          i = temp.toString().substring(0, temp.toString().indexOf('.'));
        }
      }
      return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + fractionString;
    } else {
      const temp = +`${Math.round(Number(`${Number(tempValue.toString())}e+${fractionDigit}`))}e-${fractionDigit}`;
      const i = temp.toString();
      return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  } catch {
    return '';
  }
};

export function formatTimeToDisplay(
  stringInput?: string,
  formatOutput = 'HH:mm:ss',
  formatInput = 'yyyyMMddHHmmss',
  ignoreTimeZone?: boolean
) {
  try {
    if (!stringInput) {
      return null;
    }
    console.log(dateFns.parse(stringInput, formatInput, new Date()), 'sssssssssss');

    let time = dateFns.parse(stringInput, formatInput, new Date());

    if (ignoreTimeZone !== true) {
      time = dateFns.addHours(time, 7);
    }

    return dateFns.format(time, formatOutput);
  } catch (error) {
    return null;
  }
}

export function formatDateToDisplay(stringInput?: string, formatOutput = 'dd/MM/yyyy', formatInput = 'yyyyMMdd') {
  try {
    if (!stringInput) {
      return null;
    }
    let time = dateFns.parse(stringInput, formatInput, new Date());
    time = dateFns.addHours(time, 7);
    return dateFns.format(time, formatOutput);
  } catch (error) {
    return null;
  }
}

export enum FORM_TYPE {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  INSERT = 'INSERT',
  DELETE = 'DELETE',
}

export enum COMP_TYPE {
  MODAL = 'MODAL',
}

export const quarterOfTheYear = (date: any) => {
  const month = date.getMonth() + 1;
  return Math.ceil(month / 3);
};

export function formatDateToString(date: Date | null | undefined, formatOutput = 'yyyyMMdd') {
  if (date == null) {
    return null;
  }
  return dateFns.format(date, formatOutput);
}

export function formatStringToDate(stringInput: string | undefined, formatInput = 'yyyyMMdd') {
  if (stringInput == null) {
    return new Date();
  }

  return dateFns.parse(stringInput, formatInput, new Date());
}

export const isBlank = (str?: string) => {
  return str == null || /^\s*$/.test(str);
};

export const getKey = <T>(key: string): T | null => {
  try {
    let value = null;
    if (window.localStorage != null) {
      value = window.localStorage.getItem(key);
    }
    if (value == null) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};

export const setKey = <T>(key: string, value: T): void => {
  try {
    if (value != null) {
      if (window.localStorage != null) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    }
  } catch (error) {
    return;
  }
};

export const removeKey = (key: string): void => {
  try {
    if (window.localStorage != null) {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    return;
  }
};
