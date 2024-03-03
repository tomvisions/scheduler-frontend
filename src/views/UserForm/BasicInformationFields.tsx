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
    UserName: string
    Phone: string
    Email: string
    Description: string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        Day: number
        Hour: number
        Minute: number
        [key: string]: unknown
    }
}



const BasicInformationFields = (props: BasicInformationFields) => {
  //  const { touched, errors } = props
   // const { values = { tags: [] }, touched, errors } = props
    const { values = { Day: 'sunday',  Hour: 9, Minute: 30   }, touched, errors } = props


    return (
        <AdaptableCard divider className="mb-4">
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config galldddey information</p>
            <FormItem
                label="ID"
                invalid={(errors.ID && touched.ID) as boolean}
                errorMessage={errors.ID}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="ID"
                    placeholder="id"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Name"
                invalid={(errors.Name && touched.Name) as boolean}
                errorMessage={errors.Name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="Name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
             <FormItem
                label="Phone"
                invalid={(errors.Phone && touched.Phone) as boolean}
                errorMessage={errors.Phone}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="Phone"
                    placeholder="Phone"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Email"
                invalid={(errors.Email && touched.Email) as boolean}
                errorMessage={errors.Email}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="Email"
                    placeholder="Email"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Description"
                labelClass="!justify-start"
                invalid={(errors.Description && touched.Description) as boolean}
                errorMessage={errors.Description}
            >
                <Field name="Description">
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
