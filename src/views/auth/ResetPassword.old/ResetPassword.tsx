import { useNavigate } from 'react-router-dom'
import ResetPasswordForm from './ResetPasswordForm'
import { useAppDispatch, useAppSelector } from './store'
import { FormModel, SetSubmitting } from '@/views/ResetPasswordForm'
import { isEmpty } from 'lodash'
import { apiResetPassword } from '@/services/AuthService'

const ResetPassword = () => {
 
        const navigate = useNavigate()
    
        const dispatch = useAppDispatch()
        
    
    
        const loading = useAppSelector(
            (state) => state.UserResetPassword.data.loading
        )
    

    
    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting,
        type: string
    ) => {
        setSubmitting(true)
            const success = await apiResetPassword(values)
                setSubmitting(false)
                if (success) {
                    popNotification('created')
                }
        }
        navigate('/user')
    }

    const handleDiscard = () => {
       // navigate('/app/sales/product-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteProduct({ id: userEdit.ID })
        if (success) {
            popNotification('deleted')
        }
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

    
        const onSubmit = async (
            values: ResetPasswordFormSchema,
            setSubmitting: (isSubmitting: boolean) => void
        ) => {
           const password  = await encryptMessage(values.confirmPassword)
            setSubmitting(true)
            try {                     
              //  const resp = await apiResetPassword({ iv: password.iv, encryptedData: password.encryptedData})
              const resp = await apiResetPassword({ password })
                if (resp.data) {
                    setSubmitting(false)
                    setResetComplete(true)
                }
            } catch (errors) {
                setMessage(
                    (errors as AxiosError<{ message: string }>)?.response?.data
                        ?.message || (errors as Error).toString()
                )
                setSubmitting(false)
            }
        }
    
        const onContinue = () => {
            navigate('/sign-in')
        }
    
    
        useEffect(() => {
            const path = location.pathname.substring(
                location.pathname.lastIndexOf('/') + 1
            )
            const requestParam = { token: path }
            fetchData(requestParam)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [location.pathname])
    
    
    
        
        const fetchData = (requestParam:any) => {
            dispatch(getUserByToken(requestParam))
        }
    
        console.log('fetch data')
        console.log(fetchData)
    
        return (
            <>
                <Loading loading={loading}>
                    {!isEmpty(fetchData) && (
                        <>
                            <ResetPasswordForm
                                initialData={fetchData}
                                usherGroupList={usherGroupList}
                                onFormSubmit={handleFormSubmit}
                                onDiscard={handleDiscard}
                                onDelete={handleDelete}
                            />
                        </>
                    )}
                </Loading>
                {!loading && isEmpty(userEdit) && (
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

    return <ResetPasswordForm disableSubmit={false} />
}

export default ResetPassword
