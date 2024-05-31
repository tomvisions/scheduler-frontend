import { useState, useEffect } from 'react'
import classNames from 'classnames'
import Tag from '@/components/ui/Tag'
import Loading from '@/components/shared/Loading'
import Container from '@/components/shared/Container'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import OrderProducts from './components/OrderProducts'
import PaymentSummary from './components/PaymentSummary'
import ShippingInfo from './components/ShippingInfo'
import Activity from './components/Activity'
import CustomerInfo from './components/CustomerInfo'
import { HiOutlineCalendar } from 'react-icons/hi'
import { apiGetSalesOrderDetails } from '@/services/WeekService'
import { apiAvailable } from '@/services/ScheduleService'

import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import {Button} from "@/components/ui";
import {useAppSelector} from "@/views/auth/SignIn/store";

type SalesOrderDetailsResponse = {
    id?: string
    progressStatus?: number
    payementStatus?: number
    data: {
        userList?: {
            quantity: number
            total: number
            details: Record<string, string[]>
        }[]
    }
    dateTime?: number
    paymentSummary?: {
        subTotal: number
        tax: number
        deliveryFees: number
        total: number
    }
    shipping?: {
        deliveryFees: number
        estimatedMin: number
        estimatedMax: number
        shippingLogo: string
        shippingVendor: string
    }
    product?: {

        total: number
        details: Record<string, string[]>
    }[]
    activity?: {
        date: number
        events: {
            time: number
            action: string
            recipient?: string
        }[]
    }[]
    customer?: {
        name: string
        email: string
        phone: string
        img: string
        previousOrder: number
        shippingAddress: {
            line1: string
            line2: string
            line3: string
            line4: string
        }
        billingAddress: {
            line1: string
            line2: string
            line3: string
            line4: string
        }
    }
}

type ScheduleReplaceResponse = {
    data: userList[]
}

type replaceResponse = {
    data: {
        userList: userList[]
        week: {
            CreatedAt: number
            Day: number
            Hour: number
            ID: string
            Minute: number
            Month: number
            Year: number
            UsherGroup: string
        }
    }
}


export type userList = {
    ID: string,
    Name: string,
    Email: string
}

type PayementStatus = {
    label: string
    class: string
}

const paymentStatus: Record<number, PayementStatus> = {
    0: {
        label: 'Paid',
        class: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
    },
    1: {
        label: 'Unpaid',
        class: 'text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
    },
}

const progressStatus: Record<number, PayementStatus> = {
    0: {
        label: 'Fulfilled',
        class: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100',
    },
    1: {
        label: 'Unfulfilled',
        class: 'text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20',
    },
}

const ScheduleReplace = () => {
    const location = useLocation()

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<replaceResponse>()

    const { ID, avatar, Name, authority, Email } = useAppSelector(
        (state) => state.auth.user
    )


    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


 //   const userAuth = useAppSelector(
   //     (state) => state.authState.data.authState
   // )

    const fetchData = async () => {
        const weekId = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        //console.log(weekId);

        if (weekId) {
            setLoading(true)
            const response = await apiGetSalesOrderDetails<
                replaceResponse,
                { weekId: string }
            >({ weekId })

            const userList:replaceResponse = response

            if (response) {
                setLoading(false)
                setData(userList)
            }
        }
    }

    const availableToUser = async(event:any) => {
        console.log(event.target);
        console.log(event.target.dataset.week_id);
        console.log('the name')
        console.log(ID);

        const scheduleUpdate = {week:event.target.dataset.week_id, user_usher_group: `${ID}-${event.target.dataset.usher_group}` }
        console.log(scheduleUpdate);
        const response = await apiAvailable<
            replaceResponse,
            { weekId: string }
        >(scheduleUpdate)

        const userList:replaceResponse = response

        if (response) {
            setLoading(false)
            setData(userList)
        }

        console.log('asdas')
    }

   // console.log('userlist')
//console.log(data.data.userList);
    return (
        <Container className="h-full">
            <Loading loading={loading}>
                {!isEmpty(data) && (
                    <>
                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <h3>
                                    <span>Week</span>
                                    <span className="ltr:ml-2 rtl:mr-2">
                                       {data.data.week.Month}/{data.data.week.Day}/{data.data.week.Year} at {data.data.week.Hour}:{data.data.week.Minute} Mass
                                    </span>
                                </h3>
                            </div>

                        </div>
                        <div className="xl:flex gap-4">
                            <div className="w-full">
                                <OrderProducts data={data?.data.userList}/>
                            </div>

                        </div>
                        <Button data-week_id={data.data.week.ID} data-usher_group={data.data.week.UsherGroup} onClick={availableToUser} >I AM AVAILABLE</Button>

                    </>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No order found!"
                    />
                    <h3 className="mt-8">No order found!</h3>
                </div>
            )}
        </Container>
    )
}

export default ScheduleReplace
