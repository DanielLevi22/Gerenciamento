import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowProps extends ComponentProps<'tr'> {}
export  function TableRow({...rest}: TableRowProps) {
  return (
    <tr 
      {...rest}  
      className="border-b border-white/10 hover:bg-white/5"
    />
  )
}
