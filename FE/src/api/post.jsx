import instance from "./instance";

export const getAll = async () => {
    const response = await instance.get('/post')
    return response.data
}

export const getOne = async (id) => {
    const response = await instance.get('/post/' + id)
    return response.data
}

export const add_post = async (item) => {
    const response = await instance.post('/post/', item)
    return response.data
}

export const update_post = async (id, item) => {
    const response = await instance.put('/post/'+id+'/', item)
    return response.data
}

export const remove_post = async (id) => {
    const response = await instance.delete('/post/'+id)
    return response.data
}