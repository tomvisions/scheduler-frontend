import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import CreatableSelect from 'react-select/creatable'
import Select from '@/components/ui/Select'

type Options = {
    label: string
    value: string
}[]


type FormFieldsName = {
    ID: string
    Name: string
    Password: string
    ConfirmPassword: string
    UserName: string
    Phone: string
    Email: string
    Description: string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        Name: string
        Day: number
        Hour: number
        Minute: number
        [key: string]: unknown
    }
}



const BasicInformationFields = (props: BasicInformationFields) => {
  //  const { touched, errors } = props
   // const { values = { tags: [] }, touched, errors } = props
    const { values = { Name: "", Password: "", ConfirmPassword: ""   }, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h3>Welcome {values.Name}</h3>
            <h5>Reset Password</h5>
            <FormItem
                label=""
                invalid={(errors.ID && touched.ID) as boolean}
                errorMessage={errors.ID}
            >
                <Field
                    type="type"
                    autoComplete="off"
                    name="ID"
                    placeholder="id"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Reset Password"
                invalid={(errors.Password && touched.Password) as boolean}
                errorMessage={errors.Password}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="password"
                    placeholder="Password"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Confirm Password"
                invalid={(errors.ConfirmPassword && touched.ConfirmPassword) as boolean}
                errorMessage={errors.Phone}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
