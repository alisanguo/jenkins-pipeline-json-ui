import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import aceEditorTest from '@/components/aceEditorTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ace-editor-test',
      name: 'ace-editor-test',
      component: aceEditorTest
    }
  ]
})
