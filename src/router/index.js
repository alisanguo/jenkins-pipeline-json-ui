import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import aceEditorTest from '@/components/aceEditorTest'
import Index from '@/page/index'
import Pipeline from '@/page/pipeline'
import PipelineAtom from '@/page/pipelineAtom'


Vue.use(Router)

export default new Router({
  base: '/cip/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/pipeline',
          component: Pipeline
        },
        {
          path: '/pipeline-atom',
          component: PipelineAtom
        }
      ]
    }
  ]
})
