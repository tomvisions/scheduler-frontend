import { useEffect, useMemo } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getUsers,
    addUser,
    getUsherGroupList,
    updateUser,
    deleteProduct,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import UserForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/UserForm'

import isEmpty from 'lodash/isEmpty'

injectReducer('UserEdit', reducer)

const UserEdit = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.UserEdit.data.tableData
    )

    const location = useLocation()
    const navigate = useNavigate()

    const userEdit = useAppSelector(
        (state) => state.UserEdit.data.userEditData
    )

    const usherGroupList = useAppSelector(
        (state) => state.UserEdit.data.usherGroupList
    )

    const loading = useAppSelector(
        (state) => state.UserEdit.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getUsers(data))
    }

    const fetchDataUsherGroup = () => {
        dispatch(getUsherGroupList({ pageIndex, pageSize, sort, query}))
    }


    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting,
        type: string
    ) => {
        setSubmitting(true)
        if (type === 'edit') {
            const success = await updateUser(values)
            setSubmitting(false)
            if (success) {
                popNotification('updated')
            }
        } else {
            const success = await addUser(values)
                setSubmitting(false)
                if (success) {
                    popNotification('created')
                }
        }
        navigate('/user')
    }

    const handleDiscard = () => {
        navigate('/app/sales/product-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteProduct({ id: userEdit.id })
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

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const requestParam = { id: path }
        fetchData(requestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])
    useEffect(() => {
        fetchDataUsherGroup()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    console.log('user')
    console.log(userEdit);
    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(userEdit) && (
                    <>
                        <UserForm
                            type="edit"
                            initialData={userEdit}
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
}

export default UserEdit
