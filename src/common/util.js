import {hex_md5} from 'assets/js/md5'

/***********************************md5加密***********************************/
export function amc_md5(data){
  if(data==null || data===""){
    return "";
  }
  return hex_md5("amc"+data);
}

/*********************************是否为中自庆安***********************************/
export function isZZQA(company){
  company = company.toLowerCase();
  if(company.indexOf("中自庆安")>=0){
    return true;
  }
  else if(company.indexOf("zzqa")>=0){
    return  true;
  }
  else if(company.indexOf("windit")>=0){
    return true;
  }
  return false;
}