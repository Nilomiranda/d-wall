import { Route, Switch } from 'react-router-dom'
import MessagesPage from "../messages/pages/MessagesPage";
import LoginPage from "../auth/pages/LoginPage"
import RegisterPage from "../auth/pages/RegisterPage";

const Routes = () => {
  return (
    <Switch>
      {/* todo: Create component that defines initial page */}
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/wall">
        <MessagesPage />
      </Route>
    </Switch>
  )
}

export default Routes
