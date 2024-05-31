import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    unAvailable,
    getSchedules,
    useAppDispatch,
    useAppSelector,
} from '../store'

const ProductDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.scheduleList.data.deleteConfirmation
    )
    const selectedProduct = useAppSelector(
        (state) => state.scheduleList.data.selectedProduct
    )
    const tableData = useAppSelector(
        (state) => state.scheduleList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onUnSchedule = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await unAvailable({ id: selectedProduct })

        if (success) {
            dispatch(getSchedules(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Product successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Unavailable to Usher?"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onUnSchedule}
        >
            <p>
                You are currently scheduled to be an usher at this mass. This is to confirm you are no longer able to usher for this mass.
            </p>
        </ConfirmDialog>
    )
}

export default ProductDeleteConfirmation
