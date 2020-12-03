import {hex_md5} from 'assets/js/md5'

/***********************************md5加密***********************************/
export function amc_md5(data){
  if(data==null || data===""){
    return "";
  }
  return hex_md5("amc"+data);
}