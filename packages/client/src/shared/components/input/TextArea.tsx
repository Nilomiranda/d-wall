import './styles.scss'
import {ChangeEventHandler, useMemo} from "react";

interface TextAreaProps {
  placeholder?: string
  label?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  value?: string | number | readonly string[]
  disabled?: boolean
  error?: string
}

const TextArea = ({ label, placeholder, value, error, onChange = () => null, disabled = false }: TextAreaProps) => {
  const getInputFieldClasses = useMemo(() => {
    if (error) {
      return 'input__field input__field__error';
    }

    return 'input__field'
  }, [error])

  return (
    <div className="input">
      { label ? <span className="input__label">{label}</span> : null}
      <textarea disabled={disabled} className={getInputFieldClasses} placeholder={placeholder} onChange={onChange} value={value} />
      { error ? <span className="input__error">{error}</span> : null }
    </div>
  )
}

export default TextArea
