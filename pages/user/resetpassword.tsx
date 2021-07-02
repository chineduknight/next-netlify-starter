import AuthLayout from './AuthLayout';
import ResetPassForm from './ResetPasswordForm';
const Login = () => {
  return (
    <AuthLayout
      headerText="Reset your password"
      hasGoogleLogin={false}
    >
      <ResetPassForm />
    </AuthLayout>
  )
}

export default Login
