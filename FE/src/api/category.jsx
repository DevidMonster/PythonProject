import instance from "./instance";

export const getAll = async () => {
    const response = await instance.get('/category')
    return response.data
}

export const getOne = async (id) => {
    const response = await instance.get('/category/' + id)
    return response.data
}

export const add_category = async (item) => {
    const response = await instance.post('/category/', item)
    return response.data
}

export const update_category = async (id, item) => {
    const response = await instance.put('/category/'+id+'/', item)
    return response.data
}

export const remove_category = async (id) => {
    const response = await instance.delete('/category/'+id)
    return response.data
}