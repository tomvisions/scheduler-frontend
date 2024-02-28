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

const tags = [
    { label: 'trend', value: 'trend' },
    { label: 'unisex', value: 'unisex' },
]

const weekOptions = [
    { label: 'Monday', value: 'monday'},
    { label: 'Tuesday', value: 'tuesday'},
    { label: 'Wednesday', value: 'wednesday'},
    { label: 'Thursday', value: 'Thursday'},
    { label: 'Friday', value: 'friday'},
    { label: 'Saturday', value: 'saturday'},
    { label: 'Sunday', value: 'sunday'},

]

const hourOptions = [
    { label: '0', value: 0},
    { label: '1', value: 1},
    { label: '2', value: 2},
    { label: '3', value: 3},
    { label: '4', value: 4},
    { label: '5', value: 5},
    { label: '6', value: 6},
    { label: '7', value: 7},
    { label: '8', value: 8},
    { label: '9', value: 9},
    { label: '10', value: 10},
    { label: '11', value: 11},
    { label: '12', value: 12},
    { label: '13', value: 13},
    { label: '14', value: 14},
    { label: '15', value: 14},
    { label: '16', value: 14},
    { label: '17', value: 14},
    { label: '18', value: 14},
    { label: '19', value: 14},
    { label: '20', value: 14},
    { label: '21', value: 14},
    { label: '22', value: 14},
    { label: '23', value: 14},
]

const minuteOptions = [
    { label: '00', value: 0 },
    { label: '15', value: 15},
    { label: '30', value: 30 },
    { label: '45', value: 45},
]


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
