import React, { useState, useRef, useEffect } from 'react'

export function Select({ children, value, onValueChange, ...props }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleTriggerClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative" {...props} ref={selectRef}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          value,
          onValueChange: (newValue) => {
            onValueChange(newValue)
            setIsOpen(false) // Close dropdown when item is selected
          },
          isOpen,
          onTriggerClick: handleTriggerClick
        })
      )}
    </div>
  )
}

export function SelectTrigger({ children, className = '', isOpen, onTriggerClick, ...props }) {
  return (
    <button
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={onTriggerClick}
      {...props}
    >
      {children}
      <svg 
        className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

export function SelectValue({ placeholder, value }) {
  return (
    <span className="block truncate">
      {value || placeholder}
    </span>
  )
}

export function SelectContent({ children, className = '', isOpen, ...props }) {
  if (!isOpen) return null

  return (
    <div
      className={`absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function SelectItem({ children, value, onValueChange, className = '', ...props }) {
  const handleClick = () => {
    if (onValueChange) {
      onValueChange(value)
    }
  }

  return (
    <div
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  )
}

