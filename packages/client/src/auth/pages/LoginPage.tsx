import './styles/login.scss'
import Input from "../../shared/components/input/Input";
import {FormEvent, useState} from "react";
import Button from "../../shared/components/button/Button";
import {Link, useHistory} from "react-router-dom";

const LoginPage = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    history.push('/wall')
  }

  return (
    <main className="login-page">
      <form onSubmit={handleSubmit} className="login-page__form">
        <h1>Login to your account</h1>

        <div className="login-page__form__input">
          <Input required placeholder="Ex.: name@domain.com" label="Email" type="email" value={email} onChange={({ target: { value } }) => setEmail(value)} />
        </div>

        <div className="login-page__form__input">
          <Input required placeholder="Your chosen password" label="Password" type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} />
        </div>

        <div className="login-page__form__footer">
          <Button type="submit" disabled={!email || !password} loadingText="Signing in">Sign in</Button>
        </div>

        <p>Don't have an account? <Link to="/register">Create one.</Link></p>
      </form>
    </main>
  )
}

export default LoginPage
