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
    name: string
    key: string
    gallery: string
    description: string
    primaryImage: boolean
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        primaryImage: boolean
        [key: string]: unknown
    }
}

const primageImageOptions = [
    { label: 'True', value: 1},
    { label: 'False', value: 0},
]
 
const BasicInformationFields = (props: BasicInformationFields) => {
  //  const { touched, errors } = props
    const { values = { primaryImage: 0 }, touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config image information</p>
            <FormItem
                label="Image Name"
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
                label="Key"
                invalid={(errors.key && touched.key) as boolean}
                errorMessage={errors.key}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="key"
                    placeholder="Key"
                    component={Input}
                    disabled
                />
            </FormItem>
            <FormItem
                label="Gallery ID"
                invalid={(errors.gallery && touched.gallery) as boolean}
                errorMessage={errors.gallery}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="gallery.id"
                    placeholder="Gallery ID"
                    component={Input}
                    disabled
                />
            </FormItem>
            <FormItem
                label="Gallery Name"
                invalid={(errors.gallery && touched.gallery) as boolean}
                errorMessage={errors.gallery}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="gallery.name"
                    placeholder="Gallery Name"
                    component={Input}
                    disabled
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
            <FormItem
                        label="Primary Image"
                        invalid={
                            (errors.primaryImage && touched.primaryImage) as boolean
                        }
                        errorMessage={errors.primaryImage}
                    >
                        <Field name="primaryImage">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={primageImageOptions}
                                    value={primageImageOptions.filter(
                                        (primageImageOption) =>  
                                            primageImageOption.value === values.primaryImage                                        
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
