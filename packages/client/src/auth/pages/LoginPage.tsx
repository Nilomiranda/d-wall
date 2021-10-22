import './styles/login.scss'
import Input from "../../shared/components/input/Input";
import {FormEvent, useState} from "react";
import Button from "../../shared/components/button/Button";
import {Link, useHistory} from "react-router-dom";
import {gql, useMutation} from "@apollo/client";

const SIGN_IN = gql`
    mutation newSession($email: String!, $password: String!) {
        createSession(email: $email, password: $password) {
            user {
                id
                name
                email
            }
            token
        }
    }
`

const LoginPage = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signIn, { loading: signingIn }] = useMutation(SIGN_IN)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await signIn({
        variables: {
          email,
          password
        }
      })
      history.push('/wall')
    } catch (err: any) {
      alert(err.message)
    }
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
          <Button type="submit" disabled={!email || !password} loading={signingIn} loadingText="Signing in">Sign in</Button>
        </div>

        <p>Don't have an account? <Link to="/register">Create one.</Link></p>
      </form>
    </main>
  )
}

export default LoginPage
