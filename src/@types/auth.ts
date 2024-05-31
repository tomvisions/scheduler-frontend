export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    data: {
        token: string
        user: {
            Name: string
            authority: string[]
            avatar: string
            Email: string
            ID: string
        }
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}


export type ResetThePassword = {
    password: string
    id: string,
}
