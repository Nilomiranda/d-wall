import {Link, useHistory} from "react-router-dom";
import {FormEvent, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import './styles/register.scss'

const CREATE_NEW_ACCOUNT = gql`
    mutation newAccount($email: String!, $name: String!, $password: String!) {
        createUser(email: $email, password: $password, name: $name) {
            id
            name
            email
        }
    }
`

const RegisterPage = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [createAccount, { loading: submitting, error, data }] = useMutation(CREATE_NEW_ACCOUNT)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await createAccount({
      variables: {
        email,
        name,
        password
      }
    })

    history.push('/login')
  }

  return (
    <main className="register-page">
      <form onSubmit={handleSubmit} className="register-page__form">
        <h1>Create your account</h1>

        <div className="register-page__form__input">
          <Input required placeholder="Ex.: name@domain.com" label="Email" type="email" value={email} onChange={({ target: { value } }) => setEmail(value)} />
        </div>

        <div className="register-page__form__input">
          <Input required placeholder="A nice name" label="Name" type="text" value={name} onChange={({ target: { value } }) => setName(value)} />
        </div>

        <div className="register-page__form__input">
          <Input required placeholder="A safe password" label="Password" type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} />
        </div>

        <div className="register-page__form__footer">
          <Button type="submit" disabled={!email || !name || !password} loading={submitting} loadingText="Creating account">Create account</Button>
        </div>

        <p>Already have an account? <Link to="/login">Sign in then.</Link></p>
      </form>
    </main>
  )
}

export default RegisterPage
