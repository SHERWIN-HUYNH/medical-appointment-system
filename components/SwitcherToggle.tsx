import React from 'react'

interface SwitcherToggleProps {
  enabled: boolean
  onToggle: (value: boolean) => void
}

const SwitcherToggle = ({ enabled, onToggle }: SwitcherToggleProps) => {
  return (
    <div>
      <label htmlFor="toggle1" className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            id="toggle1"
            className="sr-only"
            checked={enabled} // Set the checked state based on the enabled prop
            onChange={() => {
              onToggle(!enabled) // Call the onToggle function with the new value
            }}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              enabled && '!right-1 !translate-x-full !bg-primary dark:!bg-white'
            }`}
          ></div>
        </div>
      </label>
    </div>
  )
}

export default SwitcherToggle
