import './styles.scss'
import {ReactNode, useMemo} from "react";

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps {
  children: ReactNode

  variant?: ButtonVariant

  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean

  loading?: boolean
  loadingText?: string
}

const buttonClassesMap: Record<ButtonVariant, string> = {
  primary: 'btn btn--primary',
  secondary: 'btn btn--secondary',
  danger: 'btn btn--danger'
}

const Button = ({ children, type = 'button', disabled = false, loading = false, loadingText = '', variant = 'primary' }: ButtonProps) => {
  const getButtonLabel = useMemo(() => {
    if (!loading || (loading && !loadingText)) {
      return children
    }

    if (loading && loadingText) {
      return loadingText
    }
  }, [loading])

  const getButtonClasses = useMemo(() => {
    const baseClass = buttonClassesMap[variant]

    if (disabled) {
      return `${baseClass} btn--disabled`
    }

    return baseClass
  }, [variant, disabled])

  return (
    <button className={getButtonClasses} type={type} disabled={disabled}>{getButtonLabel}</button>
  )
}

export default Button
