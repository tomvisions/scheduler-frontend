import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    usher_group: Options
}

type usherGroupLV = {
    label: string
    value: string
}


type OrganizationFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    usherGroupList: usherGroupLV[],
    values: {
        usherGroup: Options
        [key: string]: unknown
    }
}

const OrganizationFields = (props: OrganizationFieldsProps) => {
    const { values = { UsherGroup: []}, touched, errors, usherGroupList } = props
    let hello:any;

        const boo:any = values.UsherGroup;
    
        if (typeof boo === 'string') {
            hello = JSON.parse(boo);
        } else {
            hello = boo;
        }
        console.log('boo');
        console.log(boo);
    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Organizations</h5>
            <p className="mb-6">Section to config the product attribute</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Usher Group"
                        invalid={
                            (errors.usher_group && touched.usher_group) as unknown as boolean
                        }
                        errorMessage={errors.usher_group as string}
                    >
                        <Field name="UsherGroup">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    isMulti
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={usherGroupList}
                                    value={hello}
                                    onChange={(option) => {

                                        form.setFieldValue(field.name, option)
                                    }}
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default OrganizationFields
