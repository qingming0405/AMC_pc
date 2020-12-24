import FilterBox from './FilterBox.vue'

const MyFilterBox = {
  install(Vue, options) {
    const filterC = Vue.extend(FilterBox);
    let filterI;
    const init = () => {
       filterI = new filterC();
       const dom = filterI.$mount().$el;
       document.body.appendChild(dom);
    };
    Vue.prototype.$filterbox = (methodOptions) => {
       if (!filterI) {
          init();
       }
       Object.assign(filterI, methodOptions);
       return filterI.showFilterBox().then(res => {
         filterI = null
         return Promise.resolve(res)
       }).catch(err => {
         filterI = null
         return Promise.reject(err)
       })
    }
 },
}

export default MyFilterBox