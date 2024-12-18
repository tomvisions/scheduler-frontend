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
    Day: string
    Hour: number
    Minute: number
    Description: string
    UsherAmount: Number
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

const weekOptions = [
    { label: 'Monday', value: 'monday'},
    { label: 'Tuesday', value: 'tuesday'},
    { label: 'Wednesday', value: 'wednesday'},
    { label: 'Thursday', value: 'Thursday'},
    { label: 'Friday', value: 'friday'},
    { label: 'Saturday', value: 'saturday'},
    { label: 'Sunday', value: 'sunday'},

]

const ushersAmount = [
    { label: '1', value: 1},
    { label: '2', value: 2},
    { label: '3', value: 3},
    { label: '4', value: 4},
    { label: '5', value: 5},
    { label: '6', value: 6},
    { label: '7', value: 7},
    { label: '8', value: 8},
    { label: '9', value: 9},

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
    { label: '15', value: 15},
    { label: '16', value: 16},
    { label: '17', value: 17},
    { label: '18', value: 18},
    { label: '19', value: 19},
    { label: '20', value: 20},
    { label: '21', value: 21},
    { label: '22', value: 22},
    { label: '23', value: 23},
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
    const { values = { Day: 'sunday',  Hour: 9, Minute: 30, UsherAmount: 4 }, touched, errors } = props


    return (
        <AdaptableCard divider className="mb-4">
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config usher group information</p>

            <FormItem
                label="ID"
                invalid={(errors.ID && touched.ID) as boolean}
                errorMessage={errors.ID}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="ID"
                    placeholder="ID"
                    component={Input}

                />
            </FormItem>
            <FormItem
                label="Usher Group Name"
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
                        label="Ushers Amount"
                        invalid={
                            (errors.UsherAmount && touched.UsherAmount) as boolean
                        }
                        errorMessage={errors.UsherAmount}
                    >
                        <Field name="UsherAmount">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    name="UsherAmount"
                                    options={ushersAmount}
                                    value={ushersAmount.filter(
                                        (usherAmount) =>  
                                        usherAmount.value === values.UsherAmount                                        
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



            <FormItem
                        label="Week Day"
                        invalid={
                            (errors.Day && touched.Day) as boolean
                        }
                        errorMessage={errors.Day}
                    >
                        <Field name="Day">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={weekOptions}
                                    value={weekOptions.filter(
                                        (weekOption) =>  
                                        weekOption.value === values.Day                                        
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


                    <FormItem
                        label="Hour"
                        invalid={
                            (errors.Day && touched.Day) as boolean
                        }
                        errorMessage={errors.Day}
                    >
                        <Field name="Hour">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={hourOptions}
                                    value={hourOptions.filter(
                                        (hourOption) =>  
                                        hourOption.value === values.Hour                                        
                                    )}
                                    name="Hour"
                                    onChange={async (option) => {
                                        console.log(field.name);
                                        console.log(option?.value)
                                        const boo = await form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                        console.log('boo')
                                        console.log(boo);
                                    }}
                                />
                            )}
                        </Field>
                    </FormItem>

                    <FormItem
                        label="Minute"
                        invalid={
                            (errors.Minute && touched.Minute) as boolean
                        }
                        errorMessage={errors.Minute}
                    >
                        <Field name="Minute">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={minuteOptions}
                                    value={minuteOptions.filter(
                                        (minuteOption) =>  
                                        minuteOption.value === values.Minute                                        
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
