//import { cryptoOptions } from '@/utils/crypto'
import ApiService from './ApiService'
import {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse, ResetThePassword,
} from '@/@types/auth'

export const URL = 'http://127.0.0.1:3500/auth'
export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: `${URL}/sign-in`,
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignUpResponse>({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: `${URL}/sign-out`,
        method: 'post',
    })
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data: ResetThePassword) {
     console.log('reset')
     console.log(data);
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}

export async function apiRetrieveToken(data: ResetPassword) {
    console.log('reset')
    console.log(data);
   return ApiService.fetchData({
       url: '/reset-password',
       method: 'post',
       data,
   })
}
