import TagForm, {
    FormModel,
    SetSubmitting,
} from '@/views/TagForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateTag } from '@/services/ScheduleService'

const TagNew = () => {
    const navigate = useNavigate()

    const addTag = async (data: FormModel) => {

        const response = await apiCreateTag<boolean, FormModel>(data)
        console.log('tje response');
        console.log(response.data)

        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addTag(values)
        setSubmitting(false)
        console.log('the succ')
        console.log(success);
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Tag successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/sales/product-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/product-list')
    }

    return (
        <>
            <TagForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default TagNew
