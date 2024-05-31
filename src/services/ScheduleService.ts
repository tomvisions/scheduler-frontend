import { TableQueries } from '@/@types/common'
import ApiService from './ApiService'

export async function apiGetSalesDashboardData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/sales/dashboard',
        method: 'post',
    })
}

/**
 * Formating the params
 * @param data 
 */
async function formatParams(data:TableQueries) {
    
    return [data.pageSize ?? 10, (data.sort?.key ? data.sort?.key : 'created_at'), (data.sort?.order ? data.sort?.order :'asc'), data.query].filter((param) => {
     
        if (param) {
            return param;
        } 
   });
}

export const URL = 'http://127.0.0.1:3500/schedule'
export async function apiGetSchedules<T, U extends Record<string, unknown>>(
    data: TableQueries
) {
    const params = await formatParams(data);

    //  console.log(`${URL}/page-index/${data['pageIndex']}/page-size/${params.join('/')}`)
   // console.log(too)

//    console.log(`${URL}/page-index/${data['pageIndex']}/page-size/${params.join('/')}`)
    return ApiService.fetchData<T>({
        url: `${URL}/page-index/${data['pageIndex']}/page-size/${params.join('/')}`,
        method: 'post',
        data,
    })
}

export async function apiUnAvailable<T, U extends Record<string, unknown>>(
    data: TableQueries
) {
    const params = await formatParams(data);

    //  console.log(`${URL}/page-index/${data['pageIndex']}/page-size/${params.join('/')}`)
    console.log('the data')
   console.log(data);
    return ApiService.fetchData<T>({
        url: `${URL}/unavailable`,
        method: 'post',
        data,
    })
}

export async function apiAvailable<
    T,
    U extends Record<string, unknown>
>(data: any) {
    console.log(`${URL}/available`)
    const hello =  await ApiService.fetchData<T>({
        url: `${URL}/available/`,
        method: 'post',
        data
    })

    return hello.data;
}