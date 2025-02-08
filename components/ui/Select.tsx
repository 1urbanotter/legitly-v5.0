// /components/common/SignOutButton.tsx
import clsx from 'clsx'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}

export const Select = ({ options, className, ...props }: SelectProps) => (
  <select
    {...props}
    className={clsx(
      'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm',
      'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500',
      'bg-white text-gray-900',
      className
    )}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)
