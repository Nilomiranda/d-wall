import './styles.scss'
import loadingIconUrl from '../../../assets/icons/loading_icon.svg'

interface SpinnerProps {
  text?: string
}

const Spinner = ({ text }: SpinnerProps) => {
  return (
    <div className="loading-container">
      <img className="loading-container__spinner animate__rotate" src={loadingIconUrl} alt="Loading spinner" />
      { text ? <span className="loading-container__text">{text}</span> : null }
    </div>
  )
}

export default Spinner
