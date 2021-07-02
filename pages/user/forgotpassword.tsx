import AuthLayout from './AuthLayout';
import ForgotPasswordForm from './ForgotForm';
const Login = () => {
  return (
    <AuthLayout
      headerText="Forgot your password"
      hasGoogleLogin={false}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}

export default Login
