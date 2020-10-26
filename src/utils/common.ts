import { Obj } from 'interfaces/common';
import * as dateFns from 'date-fns';
import { toast } from 'react-toastify';

export const BASE_URI = 'http://localhost:8000/';

export const configHeaderAxios = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With',
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

export const notificationError = (params: Obj) => {
  toast.error(params.content, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
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

export enum FORM_TYPE {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  INSERT = 'INSERT',
  DELETE = 'DELETE',
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
