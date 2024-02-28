import { useEffect, useMemo } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getImage,
    updateImage,
    deleteProduct,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import ImageForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/ImageForm'

import isEmpty from 'lodash/isEmpty'

injectReducer('ImageEdit', reducer)

const ImageEdit = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.ImageEdit.data.tableData
    )

    const location = useLocation()
    const navigate = useNavigate()

    const imageData = useAppSelector(
        (state) => state.ImageEdit.data.imageData
    )
    const loading = useAppSelector(
        (state) => state.ImageEdit.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getImage(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await updateImage(values)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
        navigate('/image')
    }

    const handleDiscard = () => {
        navigate('/app/sales/product-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteProduct({ id: imageData.id })
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

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(imageData) && (
                    <>
                        <ImageForm
                            type="edit"
                            initialData={imageData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(imageData) && (
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

export default ImageEdit
