import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuth from '@/utils/hooks/useAuth'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import {useEffect} from "react";
import {getAuthByToken, useAppDispatch, useAppSelector} from "./store";
import {setUser, signInSuccess} from "@/store";
import {REDIRECT_URL_KEY} from "@/constants/app.constant";
import appConfig from "@/configs/app.config";
import {useNavigate} from "react-router-dom";

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}

type SignInFormSchema = {
    email: string
    password: string
    rememberMe: boolean
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props: SignInFormProps) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props

    const dispatch = useAppDispatch()

    const [message, setMessage] = useTimeOutMessage()

    const { signIn } = useAuth()
    const navigate = useNavigate()


    const data = useAppSelector(
        (state) => state.authState.data.authState
    )

    console.log('data')
    console.log(data);
   if (data.user && data.token) {

           const { token } = data
           dispatch(signInSuccess(token))


               const { user} = data;
               dispatch(
                   setUser(
                       user
                   )
               )

            //    navigate(
              //   `/schedule/replace/${user.Week}`
                //)

   }
         //  const redirectUrl = query.get(REDIRECT_URL_KEY)
     //      navigate(
       //        redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
         //  )





    const onSignIn = async (
        values: SignInFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const {email, password} = values
        setSubmitting(true)
        const result = await signIn({email, password})

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }



    const fetchData = (token:{token:string} = {token:""}) => {
            dispatch(getAuthByToken({ token: token.token }))
    }

    useEffect(() => {
        let requestParam = {token: ""}
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/sign-in/') + 9
        )

        if (path) {
            requestParam = { token: path }
            fetchData(requestParam)

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])


    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <>{message}</>
                </Alert>
            )}
            <Formik
                initialValues={{
                    email: 'tcruicksh@gmail.com',
                    password: 'testing2',
                    rememberMe: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Email"
                                invalid={
                                    (errors.email &&
                                        touched.email) as boolean
                                }
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={
                                    (errors.password &&
                                        touched.password) as boolean
                                }
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <div className="flex justify-between mb-6">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                >
                                    Remember Me
                                </Field>
                                <ActionLink to={forgotPasswordUrl}>
                                    Forgot Password?
                                </ActionLink>
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>{`Don't have an account yet?`} </span>
                                <ActionLink to={signUpUrl}>Sign up</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignInForm
