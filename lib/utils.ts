import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value))

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

// FORMAT DATE TIME
export const formatDateTime = (
  dateString: Date | string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    year: 'numeric', // numeric year (e.g., '2023')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false),
    timeZone: timeZone, // use the provided timezone
  }

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    year: 'numeric', // numeric year (e.g., '2023')
    month: '2-digit', // abbreviated month name (e.g., 'Oct')
    day: '2-digit', // numeric day of the month (e.g., '25')
    timeZone: timeZone, // use the provided timezone
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
    timeZone: timeZone, // use the provided timezone
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    timeZone: timeZone, // use the provided timezone
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions,
  )

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    'en-US',
    dateDayOptions,
  )

  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)

  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export function encryptKey(passkey: string) {
  return btoa(passkey)
}

export function decryptKey(passkey: string) {
  return atob(passkey)
}

export const shortenTitle = (title: string) => {
  const titleMap: { [key: string]: string } = {
    'Giáo sư': 'GS BS',
    'Tiến sĩ': 'TS BS',
    'Thạc sĩ': 'ThS BS',
  }
  return titleMap[title] || title
}

export const getDayOfWeek = (dateStr: string) => {
  const daysInVietnamese: { [key: string]: string } = {
    Mon: 'Thứ 2',
    Tue: 'Thứ 3',
    Wed: 'Thứ 4',
    Thu: 'Thứ 5',
    Fri: 'Thứ 6',
    Sat: 'Thứ 7',
    Sun: 'Chủ nhật',
  }

  const [year, month, day] = dateStr.split('-').map((num) => parseInt(num))
  const date = new Date(year, month - 1, day)
  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })
  return daysInVietnamese[dayOfWeek] || dayOfWeek
}

const dayOrder: { [key: string]: number } = {
  'Thứ 2': 1,
  'Thứ 3': 2,
  'Thứ 4': 3,
  'Thứ 5': 4,
  'Thứ 6': 5,
  'Thứ 7': 6,
  'Chủ nhật': 7,
}

export const sortDayOfWeek = (days: string[]) => {
  return days.sort((a, b) => {
    const dayA = getDayOfWeek(a)
    const dayB = getDayOfWeek(b)
    return dayOrder[dayA] - dayOrder[dayB]
  })
}
