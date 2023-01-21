import {host, hostAuth}  from '../../axios'

const removeImageData = async (imageData) => {
    const image = await hostAuth.post("/admin/remove-image",imageData);
    return image.data;
}
const removeGood = async (id) => {
    const image = await hostAuth.post("/admin/remove-good",id);
    return image.data;
}

const createCategory = async (categoryData) => {
    const cat = await hostAuth.post("/admin/create-category", categoryData);
    return cat.data;
};
const updateGood = async (goodData) => {
    const good = await hostAuth.post("/admin/update-good", goodData);
    return good.data;
};

const adminServices = {
  
    removeImageData,
    removeGood,
    createCategory,
    updateGood
   
}
export default adminServices;