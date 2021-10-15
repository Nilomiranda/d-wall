import './styles.scss'
import {ChangeEventHandler} from "react";

interface TextAreaProps {
  placeholder?: string
  label?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  value?: string | number | readonly string[]
  disabled?: boolean
}

const TextArea = ({ label, placeholder, value, onChange = () => null, disabled = false }: TextAreaProps) => {
  return (
    <div className="input">
      { label ? <span className="input__label">{label}</span> : null}
      <textarea disabled={disabled} className="input__field" placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  )
}

export default TextArea
