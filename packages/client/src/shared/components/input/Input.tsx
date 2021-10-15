import './styles.scss'
import {ChangeEventHandler, HTMLInputTypeAttribute, useMemo} from "react";

interface InputProps {
  placeholder?: string
  label?: string
  type?: HTMLInputTypeAttribute
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string | number | readonly string[]
  disabled?: boolean
  error?: string
}

const Input = ({ label, placeholder, value, error, type = 'text', onChange = () => null, disabled = false }: InputProps) => {
  const getInputFieldClasses = useMemo(() => {
    if (error) {
      return 'input__field input__field__error';
    }

    return 'input__field'
  }, [error])

  return (
    <div className="input">
      { label ? <span className="input__label">{label}</span> : null}
      <input className={getInputFieldClasses} disabled={disabled} type={type} placeholder={placeholder} onChange={onChange} value={value} />
      { error ? <span className="input__error">{error}</span> : null }
    </div>
  )
}

export default Input
