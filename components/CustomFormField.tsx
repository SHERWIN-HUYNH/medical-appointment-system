/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { E164Number } from 'libphonenumber-js/core'
import Image from 'next/image'
import ReactDatePicker from 'react-datepicker'
import { Control } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Checkbox } from './ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import React, { useState } from 'react'
import { formatPrice } from '@/helpers/formatCurrency'

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  PASSWORD = 'password',
  PRICE = 'price',
}

interface CustomProps {
  control: Control<any>
  name: string
  label?: string
  type?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
  fieldType: FormFieldType
  currentPassword?: string
  css?: string
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const [isFocused, setIsFocused] = useState(false)
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border bg-white">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || 'icon'}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
              type={props.type || 'text'}
              disabled={props.disabled}
            />
          </FormControl>
        </div>
      )
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl className="bg-white">
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className={props.css ? props.css : 'input-phone'}
          />
        </FormControl>
      )
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-white">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? 'MM/dd/yyyy'}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content custom-scrollbar">
              <div className="select-items-container">{props.children}</div>
            </SelectContent>
          </Select>
        </FormControl>
      )
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null
    case FormFieldType.PRICE: {
      const formatInputValue = (value: string) => {
        const numbers = value.replace(/\D/g, '')

        const digits = numbers.split('').reverse()

        const groups = []
        for (let i = 0; i < digits.length; i += 3) {
          groups.push(
            digits
              .slice(i, i + 3)
              .reverse()
              .join(''),
          )
        }

        return groups.reverse().join('.')
      }

      return (
        <div className="flex rounded-md border bg-white">
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              value={
                isFocused
                  ? formatInputValue(field.value?.toString() || '')
                  : formatPrice(field.value)
              }
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                setIsFocused(false)
                field.onChange(e.target.value.replace(/\D/g, ''))
              }}
              onChange={(e) => {
                const formattedValue = formatInputValue(e.target.value)
                e.target.value = formattedValue
                field.onChange(e.target.value.replace(/\D/g, ''))
              }}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
    }
    default:
      return null
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
