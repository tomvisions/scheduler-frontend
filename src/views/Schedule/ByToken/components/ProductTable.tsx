import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {Schedule} from "@/views/Schedule/List/components/ScheduleListType";
import {
    getSchedules,
    setTableData,
    setSelectedProduct,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector, getSchedulesByToken,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import ProductDeleteConfirmation from "@/views/Schedule/List/components/ProductDeleteConfirmation";
import {UserState} from "@/store";

const ActionColumn = ({ row }: { row: Schedule }) => {
    let render = true;
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/gallery/edit/${row.ID}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.ID))
    }

    const onUnAvailable = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.ID))
    }

    const auth = useAppSelector(
        (state) => state.auth.user
    )

    const users = JSON.parse(row.User)
    for (let i=0;i<users.length;i++) {
        if (auth.Name === users[i].user) {
            render = false;
        }

    }

    if (render) {
        return (
            <>
            </>
        )
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onUnAvailable}
            >
               Unavailable
            </span>
        </div>
    )
}


const ProductTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const {pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.scheduleList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.scheduleList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.scheduleList.data.loading
    )

    const data = useAppSelector(
        (state) => state.scheduleList.data.scheduleList
    )

    const user = useAppSelector(
        (state) => state.auth.user
    )


    useEffect(() => {
        let requestParam = {id: ""}
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        if (path) {
            requestParam = { id: path }
        }
        if (user) {
            fetchData(user, "group" , requestParam)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort, location.pathname])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = (user:any, type:string, request:{id:string} = {id:""}) => {
        //  console.log('check ID')
      //  console.log(ID);
        const userId = user.ID
        console.log('the request')
        console.log(request);

        if (request.id !== "schedule") {
            const requestId = request.id
            dispatch(getSchedulesByToken({ userId, type, requestId, pageIndex, pageSize, sort, query, filterData }))
        } else {
            dispatch(getSchedules({userId, type, pageIndex, pageSize, sort, query, filterData}))
        }
    }

    const UserColumn = ({ row }: { row: string }) => {

        const usersArray = JSON.parse(row)
        const goodArray:any = []
        usersArray.map((user:any) => {
            goodArray.push(user.user);
        })
            //  const users = goodArray.split(',')

        return ( <span className="capitalize">{JSON.stringify(goodArray)}</span>)
    }

    const columns: ColumnDef<Schedule>[] = useMemo(
        () => [
            {
                header: 'Week',
                accessorKey: 'week',
                cell: (props) => {
                    const row = props.row.original

                    return <span className="capitalize">{row.Week}</span>
                  //  return <GalleryColumn row={row} />
                },
            },
            {
                header: 'Mass',
                accessorKey: 'mass',
                cell: (props) => {
                    const row = props.row.original

                    return <span className="capitalize">{row.Mass}</span>
                    //  return <GalleryColumn row={row} />
                },
            },
            {
                header: 'Usher',
                accessorKey: 'usher',
                cell: (props) => {
                    const row = props.row.original

                    return <UserColumn row={row.User} />

                 //   return <span className="capitalize"></span>
                    //  return <GalleryColumn row={row} />
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
            />
            <ProductDeleteConfirmation />
        </>
    )
}

export default ProductTable
