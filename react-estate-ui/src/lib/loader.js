import apiRequest from "./apiRequest";
export const singlePageLoader = async({request,params}) =>{
    console.log("check:"+params.id);
    
    const res =  await apiRequest("/api/posts/" +params.id);
    try{
        console.log(res.data.message);
    }catch(err){
        console.log(res.data.message);
    }
    return res.data;
}
export const listPageLoader = async({request,params}) => {
    // console.log(request);
    const query = request.url.split("?")[1]
    const res = await apiRequest("/api/posts?" + query);
    return res.data; 
    
}
export const profilePageLoader = async({request,params}) => {
    // console.log(request);
    const postPromise = await apiRequest("/api/users/profilePosts");;
    return postPromise.data
    
}