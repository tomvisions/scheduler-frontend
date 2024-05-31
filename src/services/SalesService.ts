import ApiService from './ApiService'

export async function apiGetSalesDashboardData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/sales/dashboard',
        method: 'post',
    })
}

export const URL = 'http://127.0.0.1:3500/week/';
export async function apiGetGalleries<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `${URL}/media`,
        method: 'post',
        data,
    })
}

export async function   apiCreateTag<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `${URL}/media/tag/new`,
        method: 'post',
        data,
    })
}


export async function apiGetImages<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `${URL}/media/image`,
        method: 'post',
        data,
    })
}

export async function apiGetTags<T, U extends Record<string, unknown>>(
    data: U
) {
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
    return ApiService.fetchData<T>({
        url: '/sales/products/delete',
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
    console.log( `${URL}/image/id/${params['id']}`);
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
