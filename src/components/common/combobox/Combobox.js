import Combobox from './Combobox.vue'

const MyCombobox = {
  install(Vue, options) {
    const comboC = Vue.extend(Combobox);
    let comboI;
    const init = () => {
       comboI = new comboC();
       const dom = comboI.$mount().$el;
       document.body.appendChild(dom);
    };
    Vue.prototype.$combobox = (methodOptions) => {
       if (!comboI) {
          init();
       }
       Object.assign(comboI, methodOptions);
       return comboI.showCombo().then(res => {
         comboI = null
         return Promise.resolve(res)
       }).catch(err => {
         comboI = null
         return Promise.reject(err)
       })
    }
 },
}

export default MyCombobox