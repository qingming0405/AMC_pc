import Combobox from './Combobox.vue'

const MyCombobox = {
  install(Vue, options) {
    const testInstance = Vue.extend(Combobox);
    let msg;
    const init = () => {
       msg = new testInstance();
       const dom = msg.$mount().$el;
       document.getElementById('app').appendChild(dom);
    };
    Vue.prototype.$combobox = (options) => {
       if (!msg) {
          init();
       }
       if (typeof options === 'string') {
          msg.content = options;
       } else if (Object.prototype.toString.call(options).slice(8, -1) === 'Object') {
          Object.assign(msg, options);
       }
       return msg.openAlert().then(
          val => {
             msg = null;
             return Promise.resolve(val);
          },
       ).catch(err => {
          msg = null;
          return Promise.reject(err);
       })
    }
 },
}

export default MyCombobox