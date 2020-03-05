const ALL_PIPELINE_ATOM = [
  {
    id: 'ATOM-001',
    identifier: 'citicCodeCheck',
    status: 'active',
    version: 'master',
    name: '卡中心代码规范检查',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: [
      {
        id: 1,
        name_en: 'SCAN_PATH',
        name_cn: '扫描路径',
        type: 'string',
        form_item: 'input',
        required: true,
        default: '',
        description: '代码规范检查扫描路径'
      },
      {
        id: 2,
        name_en: 'EXIT_AFTER_SCAN',
        name_cn: '扫描后是否退出',
        type: 'string',
        form_item: 'select',
        options: [
        {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        }],
        required: true,
        default: '是',
        description: '扫描后是否退出'
      }

    ]
  },
  {
    id: 'ATOM-003',
    identifier: 'checkout',
    status: 'active',
    version: 'master',
    name: '从版本控制检出',
    type: '共享库原子',
    type_special: '通用原子',
    parameters: [
      {
        id: 1,
        name_en: '',
        name_cn: '凭证',
        type: 'string',
        form_item: 'input',
        required: true,
        default: '',
        description: '代码规范检查扫描路径'
      },
      {
        id: 2,
        name_en: 'EXIT_AFTER_SCAN',
        name_cn: '扫描后是否退出',
        type: 'string',
        form_item: 'select',
        options: [
        {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        }],
        required: true,
        default: '是',
        description: '扫描后是否退出'
      }

    ]
  },
  {
    id: 'ATOM-001',
    identifier: 'maven',
    status: 'active',
    version: 'master',
    name: '从版本控制检出',
    type: '共享库原子',
    type_special: '通用原子',
    parameters: [
      {
        id: 1,
        name_en: 'SCAN_PATH',
        name_cn: '扫描路径',
        type: 'string',
        form_item: 'input',
        required: true,
        default: '',
        description: '代码规范检查扫描路径'
      },
      {
        id: 2,
        name_en: 'EXIT_AFTER_SCAN',
        name_cn: '扫描后是否退出',
        type: 'string',
        form_item: 'select',
        options: [
        {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        }],
        required: true,
        default: '是',
        description: '扫描后是否退出'
      }

    ]
  },
  {
    id: 'ATOM-021',
    identifier: 'sh',
    status: 'active',
    version: '',
    name: '执行 Shell 脚本',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: [
    {
      id: 1,
      name_en: 'script',
      name_cn: '执行脚本',
      type: 'string',
      form_item: 'textarea',
      required: true,
      default: '',
      description: '需要执行的脚本'
    }]
  },
  {
    id: 'ATOM-022',
    identifier: 'script',
    status: 'active',
    version: '',
    name: '执行任意的 Pipeline 脚本',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: [
    {
      id: 1,
      name_en: 'scriptBlock',
      name_cn: 'Pipeline 脚本',
      type: 'string',
      form_item: 'textarea',
      required: true,
      default: '',
      description: '需要执行的 Pipeline 脚本'
    }]
  },
  {
    id: 'ATOM-023',
    identifier: 'load',
    status: 'active',
    version: '',
    name: '执行 Groovy 源文件',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: [
    {
      id: 1,
      name_en: 'path',
      name_cn: 'Groovy 文件路径',
      type: 'string',
      form_item: 'input',
      required: true,
      default: '',
      description: '需要执行的 Groovy 文件路径'
    }]
  },
  {
    id: 'ATOM-024',
    identifier: 'sleep',
    status: 'active',
    version: '',
    name: '休眠',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: [
    {
      id: 1,
      name_en: 'time',
      name_cn: '时间',
      type: 'number',
      form_item: 'input-number',
      required: true,
      default: '',
      description: '休眠时间'
    },
    {
      id: 1,
      name_en: 'unit',
      name_cn: '单位',
      type: 'string',
      form_item: 'select',
      required: true,
      default: '',
      description: '休眠时间单位'
    }]
  },
  {
    id: 'ATOM-025',
    identifier: 'error',
    status: 'active',
    version: '',
    name: '错误信号',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: [
    {
      id: 1,
      name_en: 'message',
      name_cn: '错误信息',
      type: 'string',
      form_item: 'input',
      required: true,
      default: '',
      description: '错误信息'
    }]
  },
  {
    id: 'ATOM-026',
    identifier: 'pwd',
    status: 'active',
    version: '',
    name: '当前目录',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: []
  },
  {
    id: 'ATOM-027', //??????
    identifier: 'writeFile',
    status: 'active',
    version: '',
    name: '写文件',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: [
    {
      id: 1,
      name_en: 'file',
      name_cn: '文件名',
      type: 'string',
      form_item: 'input',
      required: true,
      default: '',
      description: '文件名'
    }, {
      id: 1,
      name_en: 'text',
      name_cn: '文件内容',
      type: 'string',
      form_item: 'inputarea',
      required: true,
      default: '',
      description: '文件内容'
    }, {
      id: 1,
      name_en: 'encoding',
      name_cn: '文件编码',
      type: 'string',
      form_item: 'input',
      required: true,
      default: '',
      description: '文件编码'
    }]
  },
  {
    id: 'ATOM-028',
    identifier: 'readFile',
    status: 'active',
    version: '',
    name: '读文件',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: [
    {
      id: 1,
      name_en: 'file',
      name_cn: '文件名',
      type: 'string',
      form_item: 'input',
      required: true,
      default: '',
      description: '文件名'
    },{
      id: 1,
      name_en: 'encoding',
      name_cn: '文件编码',
      type: 'string',
      form_item: 'input',
      required: true,
      default: '',
      description: '文件编码'
    }]
  },
  {
    id: 'ATOM-029',
    identifier: 'echo',
    status: 'active',
    version: '',
    name: '打印消息',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: [
    {
      id: 1,
      name_en: 'message',
      name_cn: '消息',
      type: 'string',
      form_item: 'input',
      required: true,
      default: '',
      description: '消息'
    }]
  },
  {
    id: 'ATOM-030',
    identifier: 'retry',
    status: 'active',
    version: '',
    name: '重试子步骤',
    type: '系统预置原子',
    type_special: '通用原子',
    parameters: [
    {
      id: 1,
      name_en: 'count',
      name_cn: '重试次数',
      type: 'number',
      form_item: 'input-number',
      required: true,
      default: '',
      description: '重试次数'
    }]
  },

]

export default {
    ALL_PIPELINE_ATOM
}
