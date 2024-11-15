import {FunctionComponent, InputHTMLAttributes, useState} from 'react'
import {CalendarIcon} from 'lucide-react'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {Button} from '@/components/ui/button'
import {format} from 'date-fns'
import {cn} from '@/lib/utils'
import {Calendar} from '@/components/ui/calendar'

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  onDateChange?: (newDate: Date | undefined) => void
  initialValue?: Date
}

const DatePicker: FunctionComponent<DatePickerProps> = ({onDateChange, initialValue, ...dateProps}) => {
  const [date, setDate] = useState<Date>(initialValue ?? new Date())

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={newDate => {
              setDate(newDate ?? new Date())
              onDateChange?.(newDate)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <input
        type="date"
        {...dateProps}
        style={{display: 'none'}}
        onChange={() => {}}
        value={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      />
    </>
  )
}

export default DatePicker
