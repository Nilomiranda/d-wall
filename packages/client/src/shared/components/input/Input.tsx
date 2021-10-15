import './styles.scss'
import {ChangeEventHandler, HTMLInputTypeAttribute} from "react";

interface InputProps {
  placeholder?: string
  label?: string
  type?: HTMLInputTypeAttribute
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string | number | readonly string[]
  disabled?: boolean
}

const Input = ({ label, placeholder, value, type = 'text', onChange = () => null, disabled = false }: InputProps) => {
  return (
    <div className="input">
      { label ? <span className="input__label">{label}</span> : null}
      <input className="input__field" disabled={disabled} type={type} placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  )
}

export default Input
