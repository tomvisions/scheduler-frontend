import { useEffect, useMemo } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    useAppSelector,
    useAppDispatch,
    getUserByToken,
    resetPassword,
} from './store'

import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'


import isEmpty from 'lodash/isEmpty'
import ResetPasswordForm, {FormModel, SetSubmitting,} from '../ResetPasswordForm'

injectReducer('UserResetPasswordState', reducer)

const ResetPassword = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.UserResetPasswordState.data.tableData
    )

    const location = useLocation()
    const navigate = useNavigate()

    const userByToken = useAppSelector(
        (state) => state.UserResetPasswordState.data.UserResetPasswordData
    )

    const loading = useAppSelector(
        (state) => state.UserResetPasswordState.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getUserByToken(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting,
        type: string
    ) => {

        console.log('hello there')
        console.log(values);
        setSubmitting(true)
            const success = await resetPassword(values)
                setSubmitting(false)
                console.log(success);
//                if (success) {
  ///                  popNotification('created')
     //           }
        
    //    navigate('/sign-in')
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Product successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/sales/product-list')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const requestParam = { id: path }

        fetchData(requestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])
   
    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(userByToken) && (
                    <>
                        <ResetPasswordForm
                            initialData={userByToken}
                            onFormSubmit={handleFormSubmit}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(userByToken) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No gallery found!</h3>
                </div>
            )}
        </>
    )
}

export default ResetPassword
