import MyTable from './MyTable.vue'

const cstTdType = {
  'SHOW': 'show',//仅显示
  'EDIT': 'edit',//仅编辑
  'CHECKBOX': 'checkbox',//选择
  'ICON': 'icon',//图标
  'BUTTON': 'button',//按钮
  'SELECT': 'select',//下拉选择
  'MULTI_TEXT': 'multi_text',//多文本
  'MULTI_CHECKBOX': 'multi_checkbox',//多选标签
  'MULTI_SELECT': 'multi_select',//多选下拉
  'COO_EDIT': 'coo_edit',//交互编辑
}

export{
  MyTable, cstTdType 
}