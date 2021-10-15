import './styles.scss'
import {MouseEventHandler, ReactNode, useMemo, MouseEvent} from "react";

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps {
  children: ReactNode

  variant?: ButtonVariant

  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>

  loading?: boolean
  loadingText?: string
}

const buttonClassesMap: Record<ButtonVariant, string> = {
  primary: 'btn btn--primary',
  secondary: 'btn btn--secondary',
  danger: 'btn btn--danger'
}

const Button = ({ children, type = 'button', disabled = false, loading = false, loadingText = '', variant = 'primary', onClick = () => null }: ButtonProps) => {
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

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (type === 'button') {
      onClick(event)
    }
  }

  return (
    <button className={getButtonClasses} type={type} disabled={disabled} onClick={handleClick}>{getButtonLabel}</button>
  )
}

export default Button
