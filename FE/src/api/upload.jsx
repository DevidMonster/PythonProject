import instance from "./instance"

export const uploadImages = async (files) => {
    const images = []
    const formData = new FormData();
    let fileExists = false
    for (const file of files) {
        if (file.url) {
            images.push({url: file.url})
        } else {
            fileExists = true
            formData.append('images', file.originFileObj);
        }
    }
    if (fileExists) {
        const response = await instance.post('/upload_image/', formData, { headers: { 'Content-Type': ' multipart/form-data' } });
        response.data.image_urls.map(url => images.push({url}))
    }
    return images
 };