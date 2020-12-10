import {hex_md5} from 'assets/js/md5'
import {validType} from './const'

export {validType}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
/*是否为有效数据*/
export function isValidData(data,valid_type=validType.VALID_ALL,minLength=0,maxLength=0) {
  if(data==null || data==="null"){
    return false;
  }
  if(minLength>0 && data.length<minLength){
    return false;
  }
  if(maxLength>0 && data.length>maxLength){
    return false;
  }
  var rep;
  switch (valid_type) {
    case validType.VALID_CHINESE:
      rep = /[^\u4e00-\u9fa5]/;
      break;
    case validType.VALID_NO_CHINESE:
      rep = /[\u4e00-\u9fa5]/;
      break;
    case validType.VALID_NUMBER:
      rep = /\D/;
      break;
    case validType.VALID_NO_NUMBER:
      rep = /\d/;
      break;
    case validType.VALID_NO_SPACE:
      rep = /\s/;
      break;
    case validType.VALID_NO_MARKS:
      rep = /\W/;
      break;
  }
  if(valid_type!==validType.VALID_ALL && rep.test(data)){
    return false;
  }
  return true;
}

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