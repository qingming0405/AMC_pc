import {hex_md5} from 'assets/js/md5'

/***********************************获取当前用户***********************************/
export function getCurUser(){
  return JSON.parse(sessionStorage.amc_user)
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/***********************************md5加密***********************************/
export function amc_md5(data){
  if(data==null || data===""){
    return "";
  }
  return hex_md5("amc"+data);
}


/***********************************对象转字符串***********************************/
export function jsonToStr(data){
  if(data==null || typeof data === 'undefined'){
    return ""
  }
  if(typeof data === 'String'){
    return data
  }
  return JSON.stringify(data)
}

/***********************************下载图片***********************************/
export function downloadImg(src, name, suffix){
  let link = document.createElement("a");
  if (link.download !== undefined) { // feature detection
    // Browsers that support HTML5 download attribute
    link.setAttribute("href", src);
    link.setAttribute("download", name + "." + suffix);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}