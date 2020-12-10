const VALID_ALL = "VALID_ALL";//默认全部
const VALID_CHINESE = "VALID_CHINESE";//仅中文
const VALID_NO_CHINESE = "VALID_NO_CHINESE";//不能输入中文
const VALID_NUMBER = "VALID_NUMBER";//仅数字
const VALID_NO_NUMBER = "VALID_NO_NUMBER";//不能输入数字
const VALID_NO_SPACE = "VALID_NO_SPACE";//不能输入空格
const VALID_NO_MARKS = "VALID_NO_MARKS";//不能输入标点

const validType = {
  VALID_ALL,
  VALID_CHINESE,
  VALID_NO_CHINESE,
  VALID_NUMBER,
  VALID_NO_NUMBER,
  VALID_NO_SPACE,
  VALID_NO_MARKS
}

export{
  validType
}