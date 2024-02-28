import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getImages,
    getImagesByGalleryId,
    setTableData,
    setSelectedProduct,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import ProductDeleteConfirmation from './ProductDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import {Buffer} from 'buffer';

type Product = {
    id: string
    name: string
    productCode: string
    img: string
    price: number
    stock: number
    status: number
}

type Gallery = {
    id: string
    name: string
    img: string
    description: string;
    createdAt: string
    updatedAt: string
}

type Image = {
    id: string
    key: string
    GalleryId: string
    primaryImage: number
    name: string;
    createdAt: string
    updatedAt: string
    orientation: number
}

const inventoryStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'In Stock',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Limited',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: {
        label: 'Out of Stock',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}


const ActionColumn = ({ row }: { row: Image }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/image/edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }
    const onDeleteSoft = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }


    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-300"
                onClick={onDeleteSoft}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const ProductColumn = ({ row }: { row: Product }) => {
    const avatar = row.img ? (
        <Avatar src={row.img} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const GalleryColumn = ({ row }: { row: Gallery }) => {
    const avatar = (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const ImageColumn = ({ row }: { row: Image }) => {
    const avatar = (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const ProductTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.imagesList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.imagesList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.imagesList.data.loading
    )

    const data = useAppSelector(
        (state) => state.imagesList.data.imagesList
    )

    
    useEffect(() => {  
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const requestParam = { id: path }
        fetchData(requestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getImagesByGalleryId({data, pageIndex, pageSize, sort, query,  filterData}))
    }
//    dispatch(getImages({ pageIndex, pageSize, sort, query,  filterData  }))
    
    const imageRequest = (key:any, edits:any) => {

        const config = JSON.stringify({
        bucket: "tomvisions-original-images",
        key: key,
        edits: edits
    })

    return `${Buffer.from(config).toString('base64')}`;
    }

    const formatImage = (key:any) => {          
                const signatureSmall = imageRequest(key, {
                    "resize": {
                        "width": 200,
                        "height": 200,
                        "fit": "inside"
                    }
                });
    
                return `https://d34wc8uzk8vrsx.cloudfront.net/${signatureSmall}`; 
        
        }

    const columns: ColumnDef<Image>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ImageColumn row={row} />
                },
            },
            {
                header: 'Gallery',
                accessorKey: 'GalleryId',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.GalleryId}</span>
                },
            },
            {
                header: 'Key',
                accessorKey: 'key',
                cell: (props) => {
                    const row = props.row.original
                    return <img src={formatImage(row.key)} />
                },
            },
            {
                header: 'Primary Image',
                accessorKey: 'primaryImage',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.primaryImage}</span>
                },
            },
            {
                header: 'Orientation',
                accessorKey: 'orientation',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.orientation}</span>
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

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

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
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <ProductDeleteConfirmation />
        </>
    )
}

export default ProductTable
