import AuthLayout from './AuthLayout';
import RegisterForm from './RegisterForm';
const Login = () => {
  return (
    <AuthLayout headerText="Create new account">
      <RegisterForm />
    </AuthLayout>
  )
}

export default Login
