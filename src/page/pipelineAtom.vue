<template>
  <Form :model="formData" >
    <FormItem label="步骤名称">
      {{}}
    </FormItem>
    <FormItem v-for="(item,index) in data.parameters" :key="index" :label="item.name_cn" >
      <Input v-model="formData.argMap[item.name_en]" placeholder="formData.description" v-if="item.form_item=='input'"></Input>
      <Select v-model="formData.argMap[item.name_en]" v-if="item.form_item == 'select'">
        <Option v-for="(option, index1) in item.options" :key="index1" value="option.value">{{ option.label }}</Option>
      </Select>
      <Select v-model="formData.argMap[item.name_en]" mutiple v-if="item.form_item == 'select_multiple'">
        <Option v-for="(option, index1) in item.options" :key="index1" value="option.value">{{ option.label }}</Option>
      </Select>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "pipelineAtom",
  props: {

  },
  data: () => {
    return {
      data: {
        id: 'ATOM-001',
        identifier: 'citicCodeCheck', //对应共享库变量
        status: 'active',
        version: 'master',
        name: '卡中心代码规范检查',
        type: '系统预置原子',
        parameters: [
          {
            id: 1,
            name_en: 'SCAN_PATH',
            name_cn: '扫描路径',
            type: 'string',
            form_item: 'input',
            required: true,
            default: '',
            description: '代码规范检查扫描路径',
            isLiteral: true

          },
          {
            id: 2,
            name_en: 'EXIT_AFTER_SCAN',
            name_cn: '扫描后是否退出',
            type: 'string',
            form_item: 'select',
            options: [
              {value: '是', label: '是'},
              {value: '否', label: '否'},
            ],
            required: true,
            default: '是',
            description: '扫描后是否退出',
            isLiteral: true
          }

        ]
      },
      formData: {
        name: 'sh',
        argMap: {
          path: '/test',
          a: 'bbb'
        }
      }
    }
  },
  created() {

  },
  methods: {

  }
}

</script>
<style>
</style>
