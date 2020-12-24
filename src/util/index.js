import { v4 as uuidv4 } from 'uuid';

//去localStorage中读取UUID 如果没有则生成一个
export const getUUID = ()=>{
    let UUID = window.localStorage.getItem("sph_uuid");
    if(!UUID){
        UUID = uuidv4();
        window.localStorage.setItem("sph_uuid",UUID)
    }
    return UUID;
}