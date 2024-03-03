import { TableQueries } from '@/@types/common'
import ApiService from './ApiService'


/**
 * Formating the params
 * @param data 
 */
async function formatParams(data:TableQueries) {
    
    return [data.pageSize ?? 10, (data.sort?.key ? data.sort?.key : 'name'), (data.sort?.order ? data.sort?.order :'asc'), data.query].filter((param) => {
  
        if (param) {
            return param;
        } 
   });
}

export const URL = 'http://127.0.0.1:3500/usher-group'
export async function apiGetUsherGroups<T, U extends Record<string, unknown>>(
    data: TableQueries
) {
    const params = await formatParams(data);
   
    console.log(`${URL}/page-index/${data['pageIndex']}/page-size/${params.join('/')}`)
    return ApiService.fetchData<T>({
        url: `${URL}/page-index/${data['pageIndex']}/page-size/${params.join('/')}`,
        method: 'get',
        data,
    })
}

export async function getUsherGroupById<T, U extends Record<string, unknown>>(
    params: U
) {
    console.log(`${URL}/id/${params['id']}`);
    console.log(await ApiService.fetchData<T>({
        url: `${URL}/id/${params['id']}`,
        method: 'get',
        params,
    }));
    return ApiService.fetchData<T>({
        url: `${URL}/id/${params['id']}`,
        method: 'get',
        params,
    })
}

export async function getUsherGroupByLabelValue<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `${URL}/label-value`,
        method: 'get',
        params,
    })
}

export async function apiCreateUsherGroup<T, U extends Record<string, unknown>>(
    data: U
) {
    console.log(`${URL}/new`);
    console.log(data);
    return ApiService.fetchData<T>({
        url: `${URL}/new`,
        method: 'post',
        data,
    })
}




export async function apiGetGalleries<T, U extends Record<string, unknown>>(
    data: TableQueries
) {
    const params = await formatParams(data);
   
    console.log(`${URL}/page-index/${data['pageIndex']}/page-size/${params.join('/')}`)
    return ApiService.fetchData<T>({
        url: `${URL}/page-index/${data['pageIndex']}/page-size/${params.join('/')}`,
        method: 'post',
        data,
    })
}

export async function   apiCreateTag<T, U extends Record<string, unknown>>(
    data: U
) {
    console.log(`${URL}/tag/new`);
    console.log(data);
    return ApiService.fetchData<T>({
        url: `${URL}/tag/new`,
        method: 'post',
        data,
    })
}


export async function apiGetImages<T, U extends Record<string, unknown>>(
    data: TableQueries
) {
   const params = await formatParams(data); 

   return ApiService.fetchData<T>({
        url: `${URL}/image/page-index/${data.pageIndex}/page-size/${params.join('/')}`,
        method: 'post',
    })
}

export async function apiGetTags<T, U extends Record<string, unknown>>(
    data: TableQueries
) {

 const params = await formatParams(data); 
console.log(`${URL}/tag/page-index/${data.pageIndex}/page-size/${params.join('/')}`);
    return ApiService.fetchData<T>({
        url: `${URL}/tag/page-index/${data.pageIndex}/page-size/${params.join('/')}`,
        method: 'post',
        data,
    })
}

export async function apiGetTagsList<T, U extends Record<string, unknown>>(
    data: TableQueries
) {

 const params = await formatParams(data); 
console.log(`${URL}/tag/list`);
    return ApiService.fetchData<T>({
        url: `${URL}/tag/list`,
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesProducts<
    T,
    U extends Record<string, unknown>
>(data: U) {
    console.log(`${URL}/image/id/${data['id']}`);
    return ApiService.fetchData<T>({
        url:  `${URL}/image/id/${data['id']}`,
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/media',
        method: 'get',
        params,
    })
}

export async function apiGetGallleryById<T, U extends Record<string, unknown>>(
    params: U
) {
    console.log(`${URL}/id/${params['id']}`);
    return ApiService.fetchData<T>({
        url: `${URL}/id/${params['id']}`,
        method: 'get',
        params,
    })
}

export async function apiGetImageById<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `${URL}/image/id/${params['id']}`,
        method: 'get',
        params,
    })
}


export async function apiPutGallery<T, U extends Record<string, unknown>>(
    data: U
) {
   return ApiService.fetchData<T>({
        url: `${URL}/id/${data['id']}`,
        method: 'put',
        data,
    }) 
}

export async function apiPutImage<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `${URL}/image/id/${data['id']}`,
        method: 'put',
        data,
    })
}

export async function apiPutSalesProduct<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/products/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}
