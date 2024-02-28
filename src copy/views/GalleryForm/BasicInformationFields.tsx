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
    id: string
    name: string
    description: string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const tags = [
    { label: 'trend', value: 'trend' },
    { label: 'unisex', value: 'unisex' },
]


const BasicInformationFields = (props: BasicInformationFields) => {
    const { touched, errors } = props
   // const { values = { tags: [] }, touched, errors } = props
    

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config galley information</p>
            <FormItem
                label="ID"
                invalid={(errors.id && touched.id) as boolean}
                errorMessage={errors.id}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="id"
                    placeholder="id"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Gallery Name"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Description"
                labelClass="!justify-start"
                invalid={(errors.description && touched.description) as boolean}
                errorMessage={errors.description}
            >
                <Field name="description">
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) => 
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
