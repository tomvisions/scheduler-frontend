import { useEffect, useMemo } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getGallery,
    getTagsList,
    updateGallery,
    deleteProduct,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import GalleryForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/GalleryForm'

import isEmpty from 'lodash/isEmpty'

injectReducer('GalleryEdit', reducer)

const GalleryEdit = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.GalleryEdit.data.tableData
    )

    const location = useLocation()
    const navigate = useNavigate()

    const galleryData = useAppSelector(
        (state) => state.GalleryEdit.data.galleryData
    )

    const tagList = useAppSelector(
        (state) => state.GalleryEdit.data.tagList
    )
    const loading = useAppSelector(
        (state) => state.GalleryEdit.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getGallery(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await updateGallery(values)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
        navigate('/gallery')
    }

    const handleDiscard = () => {
        navigate('/app/sales/product-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteProduct({ id: galleryData.id })
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
                {!isEmpty(galleryData) && (
                    <>
                        <GalleryForm
                            type="edit"
                            initialData={galleryData}
                            tagList={tagList}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(galleryData) && (
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

export default GalleryEdit
