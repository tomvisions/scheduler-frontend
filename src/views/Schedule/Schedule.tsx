import { useEffect, useMemo } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    addWeek,
    getUsherGroupList,
    updateUser,
    deleteProduct,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import ScheduleForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/ScheduleForm'

import isEmpty from 'lodash/isEmpty'

injectReducer('UserEdit', reducer)

export const datesToCreate = {
    start: {
      day: 0,
      month: 0,
      year: 0,
  
    },
    end: {
      day: 0,
      month: 0,
      year: 0,
  
    },
  }

const Schedule = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.UserEdit.data.tableData
    )

    const location = useLocation()
    const navigate = useNavigate()

    const usherGroupList = useAppSelector(
        (state) => state.UserEdit.data.usherGroupList
    )

    const loading = useAppSelector(
        (state) => state.UserEdit.data.loading
    )

    const fetchDataUsherGroup = () => {
        dispatch(getUsherGroupList({ pageIndex, pageSize, sort, query}))
    }


    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting,
        type: string
    ) => {
        console.log('the start')
        setSubmitting(true)
        if (type === 'edit') {
            const success = await updateUser(values)
            setSubmitting(false)
            if (success) {
                popNotification('updated')
            }
        } else {
            values.Range = datesToCreate;
            console.log('the week')
            console.log(datesToCreate);
            console.log('the values');
            console.log(values);
            values.UsherGroup = JSON.parse(values.UsherGroup)
            const success = await addWeek(values)
                setSubmitting(false)
                if (success) {
                    popNotification('created')
                }
        }
   //     navigate('/user')
    }

    const handleDiscard = () => {
        navigate('/app/sales/product-list')
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

    useEffect(() => {
        fetchDataUsherGroup()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    return (
        <>
            <Loading loading={loading}>
   
                    <>
                        <ScheduleForm
                            type="new"
                            usherGroupList={usherGroupList}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
    
            </Loading>
        </>
    )
}

export default Schedule
