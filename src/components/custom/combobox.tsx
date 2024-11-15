'use client'

import {Check, ChevronsUpDown} from 'lucide-react'

import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {FunctionComponent, InputHTMLAttributes, useState} from 'react'

interface ComboboxProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Array<{
    value: string
    label: string
  }>
  label: string
  placeholder: string
  noResultText: string
  onValueChange?: (value: string) => void
  initialValue?: string
}

const Combobox: FunctionComponent<ComboboxProps> = ({
  data,
  label,
  placeholder,
  noResultText,
  onValueChange,
  initialValue,
  ...inputProps
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>(initialValue ?? '')

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {data.find(x => x.value === value)?.label ?? label}
            <ChevronsUpDown className="ml-4 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty className="ps-4 pt-1 pe-1 pb-1">{noResultText}</CommandEmpty>
              <CommandGroup>
                {data.map(x => (
                  <CommandItem
                    key={x.value}
                    value={x.label}
                    onSelect={() => {
                      setValue(x.value)
                      onValueChange?.(x.value)
                      setOpen(false)
                    }}>
                    <Check className={cn('mr-2 h-4 w-4', value === x.value ? 'opacity-100' : 'opacity-0')} />
                    {x.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <input style={{display: 'none'}} value={value === 'new' ? '' : value} onChange={() => {}} {...inputProps} />
    </>
  )
}

export default Combobox
