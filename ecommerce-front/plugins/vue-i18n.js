import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/assets/strings/strings.json'

Vue.use(VueI18n)

export default (({ app }) => {
    const i18n = new VueI18n({
        locale: 'en',
        messages
    })
    app.i18n = i18n
})