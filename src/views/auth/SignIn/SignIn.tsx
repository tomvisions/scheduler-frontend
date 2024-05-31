import SignInForm from './SignInForm'
import {injectReducer} from "@/store";
import reducer from "./store";

injectReducer('authState', reducer)

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Welcome back!</h3>
                <p>Please enter your credentials to sign in!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
