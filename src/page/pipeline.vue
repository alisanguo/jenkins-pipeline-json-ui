<template>
  <div class="pipeline">
    <Tabs>
      <TabPane label="基础信息" icon="ios-apps">
        嗷嗷
      </TabPane>
      <TabPane label="流程配置" icon="ios-pulse">
        <div class="pipeline-flow-job">
          <div style="position: relative;width: auto;height: 100%;">
            <div :class="generateClass('body')" id="stageBody">
              <div :class="generateClass('parent-div')" v-for="(stage, index) in pipeline.stages" :key="index">
                <div :class="generateClass('split', index)" :id="'stageContent' + index">
                  <div :class="generateAddStageStepBtnClass('add-btn', index)">
                    <Icon :class="generateClass('add-icon')" :id="stageAddBtnPrefix + index" :ref="stageAddBtnPrefix + index" @click="addStage(index)" :size=22 type="md-add-circle" />
                  </div>
                </div>
                <div :class="generateClass('container')" :id="'stageContent' + index">
                  <h3 :class="generateClass('stage-title')" align="left">{{stage.name}}</h3>
                  <div align="center" v-if="stage.parallel" :class="generateClass('stages')" @mouseover="showAddParallelTask(index)" @mouseleave="hiddenAddParallelTask(index)">
                    <div align="center" :class="generateStageStepClass('stage-step', stage.parallel, index, index1)" :id="stageDivPrefix + index" :ref="stageDivPrefix + index" v-for="(p, index1) in stage.parallel" :key="index1">
                      <div :class="generateClass('stage-step-content')">
                        <div class="step-content" @click="editStageOrParallelTask(p, index, index1)">
                          <div style="display: inline-block;">{{p.name}}</div>
                        </div>
                      </div>
                    </div>
                    <div align="center" v-if="showAddParallelTaskSwitch[index]" :class="generateAddStageStepClass('stage-step')" :id="stageDivPrefix + index" :ref="stageDivPrefix + index">
                      <div :class="generateClass('stage-step-content pipeline-job-stage-step-content-add')">
                        <div class="step-content-add" @click="addParallelTask(index, true)">
                          <div style="display: inline-block;">
                            <Icon class="step-add-icon" type="md-add-circle" size="18" color="#515a6e" />
                            并行任务
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else align="center" :class="generateClass('stages')" @mouseover="showAddParallelTask(index)" @mouseleave="hiddenAddParallelTask(index)">
                    <div align="center" :class="generateStageStepClass('stage-step', stage.branches, index, 0)" :id="stageDivPrefix + index" :ref="stageDivPrefix + index">
                      <div :class="generateClass('stage-step-content')">
                        <div class="step-content" @click="editStageOrParallelTask(stage, index, -1)">
                          <div style="display: inline-block;">{{stage.name}}</div>
                        </div>
                      </div>
                    </div>
                    <div align="center" v-if="showAddParallelTaskSwitch[index]" :class="generateAddStageStepClass('stage-step')" :id="stageDivPrefix + index" :ref="stageDivPrefix + index">
                      <div :class="generateClass('stage-step-content pipeline-job-stage-step-content-add')">
                        <div class="step-content-add" @click="addParallelTask(index, false)">
                          <div style="display: inline-block;">
                            <Icon class="step-add-icon" type="md-add-circle" size="18" color="#515a6e" />
                            并行任务
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="generateClass('add-new')">
                <div :class="generateClass('split')">
                  <div :class="generateAddStageStepBtnClass('add-btn', pipeline.stages.length)">
                    <Icon :class="generateClass('add-icon')" @click="addStage(pipeline.stages.length)" :size=22 type="md-add-circle" />
                  </div>
                </div>
                <div :class="generateClass('container')" style="padding: 0 20px 0 0;">
                  <h3 :class="generateClass('stage-title')" align="left">新阶段</h3>
                  <div align="center" :class="generateClass('stages')" style="margin-right: 20px;">
                    <div align="center" style="width: 100%;" :class="generateAddStageStepClass('stage-step', 0)" @click="addStage">
                      <div :class="generateClass('stage-step-content pipeline-job-stage-step-content-add')" style="width: 100%;">
                        <div class="step-content step-content-add">
                          <div style="display: inline-block;">
                            <Icon class="step-add-icon" type="md-add-circle" size="19" color="#515a6e" />
                            新的阶段
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Drawer :class="generateClass('drawer')" stage-title="Create/Edit" v-model="showStageOrParallelTaskDrawer" width="560" :mask-closable="false" :styles="styles">
            <Row :gutter="32">
              <Col span="24">
              <p class="stage-edit-p">任务名称</p>
              <Input v-model="currentStageOrParallelTask.name" style="margin-top: 5px;" placeholder="输入阶段名称" />
              </Col>
            </Row>
            <Row :gutter="32" style="margin-top: 20px;">
              <Col span="24">
              <p class="stage-edit-p">任务步骤</p>
              <div style="margin-top: 15px;">
                <Dropdown trigger="click" placement="bottom-start" @on-click="addStep">
                  <button class="pipeline-btn-primary" @click="addStep">
                    <Icon style="float: left;" type="md-add-circle" size="20" color="#2d8cf0"></Icon>
                    <span style="margin-left: 5px;color: #2d8cf0;">添加步骤</span>
                  </button>
                  <DropdownMenu slot="list">
                    <DropdownItem v-for="(atom, index) in allAtomList" :key="index" :name="atom.identifier">{{atom.name}}</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div style="margin-top: 10px" v-if="currentStageOrParallelTask.branches">
                <pipelineAtom v-for="(step, stepIndex) in currentStageOrParallelTask.branches[0].steps" :key="stepIndex" :ref='"pipelineAtom"+stepIndex' :stepData="step" :stepIndex="stepIndex" @dataChanged="stepDataChanged" @deleteStep="deleteStep" v-if="reinitPipelineAtom && showStageOrParallelTaskDrawer"></pipelineAtom>
              </div>
              </Col>
            </Row>
            <Row :gutter="32" style="margin-top: 20px;">
              <Col span="24">
              <p class="stage-edit-p">删除任务</p>
              <p style="font-size: 14px;margin: 5px 0 10px 0;">
                该任务将被彻底删除，注意这是不可逆操作，任务下所有数据将会删除
              </p>
              <Button style="border-color: #ffdede;color: #ed4014;" @click="deleteStageOrParallelTask">删除</Button>
              </Col>
            </Row>
            <div class="demo-drawer-footer">
              <ButtonGroup style="margin-top: 15px;float: right;margin-right: 32px;">
                <Button @click="showStageOrParallelTaskDrawer = false">取消</Button>
                <Button type="primary" @click="saveStageOrParallelTask">保存</Button>
              </ButtonGroup>
            </div>
          </Drawer>
          <Modal v-model="showAtomCard" width="800">
            <p slot="header" style="color:#f60;text-align:center">
              选择任务类型
            </p>
            <atomCard @atomSelected="doAddStageOrParallelTask"></atomCard>
            <div slot="footer">
            </div>
          </Modal>
        </div>
      </TabPane>
      <TabPane label="触发规则" icon="ios-alarm">
        <div class="trigger-rule-container">
          <div class="trigger-rule-code-update">
            <span class="trigger-rule-side">触发规则</span>
            <Checkbox v-model="triggerRule.codeUpdate.checked">代码更新时自动执行</Checkbox>
            <div class="trigger-rule-event">
              <RadioGroup v-model="triggerRule.codeUpdate.event" vertical>
                <Radio label="pushSpecialBranch">
                  <Icon type="social-apple"></Icon>
                  <span>推送到Master分支时触发构建</span>
                </Radio>
                <Radio label="pushTag">
                  <Icon type="social-android"></Icon>
                  <span>推送新标签时触发构建</span>
                </Radio>
                <Radio label="pushAnyBranch">
                  <Icon type="social-windows"></Icon>
                  <span>推送到任何分支时触发构建</span>
                </Radio>
                <Radio label="pushSomeBranch">
                  <Icon type="social-windows"></Icon>
                  <span>符合分支或标签规则时构建</span>
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <div class="trigger-rule-time">
            <span class="trigger-rule-side">定时触发</span>
             <div class="trigger-rule-content">
              <Table border :columns="timeRuleColumns" :data="triggerRule.timeRuleData">
                <template slot-scope="{ row }" slot="name">
                  <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                  <Button type="error" size="small" @click="remove(index)">Delete</Button>
                </template>
              </Table>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import pipelineAtom from "./pipelineAtom";
import atomCard from "./atomCard";
import constant from "../utils/constant.js";
export default {
  name: "demo",
  components: {
    pipelineAtom,
    atomCard
  },
  data() {
    return {
      stageClassPrefix: 'pipeline-job-flow pipeline-job-',
      stageDivPrefix: 'pipeline-job-div-',
      stageAddBtnPrefix: 'add-next-btn-',
      components: [{
          value: 'java规范扫描',
          label: 'java规范扫描'
        },
        {
          value: 'python规范扫描',
          label: 'python规范扫描'
        }
      ],
      stepList: [{
        name: 'sh',
        desc: '执行SH脚本'
      }],
      pipeline: {
        stages: [{
            name: "检出",
            branches: [{
              name: "default",
              steps: [{
                name: "checkout",
                arguments: [{
                  key: "scm",
                  value: {
                    "isLiteral": false,
                    "value": "[$class: \u0027GitSCM\u0027, branches: [[name: env.GIT_BUILD_REF]],\n                                                            userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]]"
                  }
                }]
              }]
            }]
          }, {
            name: "编译",
            branches: [{
              name: "default",
              steps: [{
                name: "sh",
                arguments: [{
                  key: "script",
                  value: {
                    "isLiteral": true,
                    "value": "./mvn package -Dmaven.test.skip\u003dtrue"
                  }
                }]
              }]
            }]
          },
          {
            name: "并行阶段 3",
            parallel: [{
              name: "单元测试",
              post: {
                conditions: [{
                  condition: "always",
                  branch: {
                    name: "default",
                    steps: [{
                      name: "junit",
                      arguments: [{
                        key: "testResults",
                        value: { "isLiteral": true, "value": "target/surefire-reports/*.xml" }
                      }]
                    }]
                  }
                }]
              },
              "branches": [{
                "name": "default",
                "steps": [{
                  "name": "sh",
                  "arguments": [{
                    "key": "script",
                    "value": { "isLiteral": true, "value": "./mvnw test" }
                  }]
                }]
              }]
            }, {
              "name": "并行shell",
              "branches": [{
                "name": "default",
                "steps": [{
                  "name": "sh",
                  "arguments": [{ "key": "script", "value": { "isLiteral": true, "value": "cd /" } }]
                }]
              }]
            }]
          },
          {
            "name": "打包镜像",
            "branches": [{
              "name": "default",
              "steps": [{
                "name": "sh",
                "arguments": [{
                  "key": "script",
                  "value": {
                    "isLiteral": false,
                    "value": "\"docker build -t ${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF} .\""
                  }
                }]
              }, {
                "name": "sh",
                "arguments": [{
                  "key": "script",
                  "value": {
                    "isLiteral": false,
                    "value": "\"docker tag ${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF} ${ARTIFACT_IMAGE}:latest\""
                  }
                }]
              }]
            }]
          },
          {
            name: "并行阶段 3",
            parallel: [{
              name: "单元测试",
              post: {
                conditions: [{
                  condition: "always",
                  branch: {
                    name: "default",
                    steps: [{
                      name: "junit",
                      arguments: [{
                        key: "testResults",
                        value: { "isLiteral": true, "value": "target/surefire-reports/*.xml" }
                      }]
                    }]
                  }
                }]
              },
              "branches": [{
                "name": "default",
                "steps": [{
                  "name": "sh",
                  "arguments": [{
                    "key": "script",
                    "value": { "isLiteral": true, "value": "./mvnw test" }
                  }]
                }]
              }]
            }, {
              "name": "并行shell",
              "branches": [{
                "name": "default",
                "steps": [{
                  "name": "sh",
                  "arguments": [{ "key": "script", "value": { "isLiteral": true, "value": "cd /" } }]
                }, {
                  "name": "node",
                  "arguments": [{ "key": "label", "value": { "isLiteral": true, "value": "s" } }],
                  "children": [{
                    "name": "sh",
                    "arguments": [{
                      "key": "script",
                      "value": { "isLiteral": true, "value": "cd /test-son" }
                    }]
                  }]
                }]
              }]
            }]
          },
          {
            "name": "推送到制品库",
            "branches": [{
              "name": "default",
              "steps": [{
                "name": "script",
                "arguments": [{
                  "key": "scriptBlock",
                  "value": {
                    "isLiteral": true,
                    "value": "docker.withRegistry(\"https://${ARTIFACT_BASE}\", \"${env.DOCKER_REGISTRY_CREDENTIALS_ID}\") {\n            docker.image(\"${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF}\").push()\n            docker.image(\"${ARTIFACT_IMAGE}:latest\").push()\n          }"
                  }
                }]
              }]
            }]
          }
        ],
        "environment": [{
          "key": "ENTERPRISE",
          "value": { "isLiteral": true, "value": "citic_cpc" }
        }, { "key": "PROJECT", "value": { "isLiteral": true, "value": "coding-demo" } }, {
          "key": "ARTIFACT",
          "value": { "isLiteral": true, "value": "coding-demo" }
        }, {
          "key": "CODE_DEPOT",
          "value": { "isLiteral": true, "value": "coding-demo" }
        }, {
          "key": "ARTIFACT_BASE",
          "value": { "isLiteral": false, "value": "\"${ENTERPRISE}-docker.pkg.coding.net\"" }
        }, {
          "key": "ARTIFACT_IMAGE",
          "value": {
            "isLiteral": false,
            "value": "\"${ARTIFACT_BASE}/${PROJECT}/${ARTIFACT}/${CODE_DEPOT}\""
          }
        }],
        agent: { "type": "any" }
      },
      pathList: [],
      showAddParallelTaskSwitch: [],
      showAtomCard: false,
      showStageOrParallelTaskDrawer: false,
      styles: {
        height: 'calc(100%)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      stepData: {
        name: '',
        url: '',
        owner: '',
        type: '',
        approver: '',
        date: '',
        desc: ''
      },
      currentStageIndex: 0,
      currentParallelTaskIndex: -1,
      currentStageOrParallelTask: {},
      allAtomList: [],
      isAddParallelTask: true,
      originIsParallel: false,
      reinitPipelineAtom: true,
      triggerRule: {
        codeUpdate: {
          checked: true,
          event: 'pushAnyBranch'
        },
        timeRuleData:[]

      },
      timeRuleColumns: [{
          title: 'Name',
          slot: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
    }
  },
  created() {
    this.allAtomList = constant.ALL_PIPELINE_ATOM;
    this.init();
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        let dom = document.getElementsByClassName('demo-content');
        dom.scrollTop = 0;
        dom.scrollLeft = 0;

        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
      });
      window.addEventListener('onunload', () => {
        let dom = document.getElementsByClassName('demo-content');
        dom.scrollTop = 0;
        dom.scrollLeft = 0;

        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
      })
    });
  },
  methods: {
    init() {
      this.pipeline.stages.forEach(p => {
        this.showAddParallelTaskSwitch.push(false);
      });
    },
    generateClass(suffix) {
      return this.stageClassPrefix + suffix;
    },
    generateStageStepClass(suffix, data, stageIndex, stepIndex) {
      if (stepIndex == 0) {
        return this.stageClassPrefix + suffix + ' pipeline-job-' + suffix + '-capsule-first';
      }

      if (Array.isArray(data)) {
        if (stepIndex == data.length - 1) {
          if (this.showAddParallelTaskSwitch[stageIndex]) {
            return this.stageClassPrefix + suffix + ' pipeline-job-' + suffix + '-capsule';
          } else {
            return this.stageClassPrefix + suffix + ' pipeline-job-' + suffix + '-capsule-latest';
          }
        } else {
          return this.stageClassPrefix + suffix + ' pipeline-job-' + suffix + '-capsule';
        }
      }

      return this.stageClassPrefix + suffix + ' pipeline-job-' + suffix + '-capsule';
    },
    generateAddStageStepClass(suffix, stepIndex) {
      if (stepIndex == 0) {
        return this.stageClassPrefix + suffix + ' pipeline-job-' + suffix + '-capsule-first';
      }

      return this.stageClassPrefix + suffix + ' pipeline-job-' + suffix + '-capsule-latest';
    },
    generateAddStageStepBtnClass(suffix, stageIndex) {
      if (stageIndex == 0) {
        return this.stageClassPrefix + suffix + '-first';
      }

      return this.stageClassPrefix + suffix;
    },
    getStepInfo(name) {
      let steps = this.stepList.filter(s => {
        return s.name == name;
      });

      return steps.length == 0 ? null : steps[0];
    },
    showAdd(index) {
      return this.showAddParallelTaskSwitch[index];
    },
    submit() {
      this.showStageOrParallelTaskDrawer = false;
    },
    cancel() {
      this.showStageOrParallelTaskDrawer = false;
    },
    // stage相关方法
    editStageOrParallelTask(stageOrParallelTask, stageIndex, parallelTaskIndex) {
      this.currentStageIndex = stageIndex;
      this.currentParallelTaskIndex = parallelTaskIndex;
      this.showStageOrParallelTaskDrawer = true;
      this.currentStageOrParallelTask = stageOrParallelTask;
    },
    addStage(index) {
      this.currentStageIndex = index;
      this.showAtomCard = true;
      this.isAddParallelTask = false;
    },
    doAddStageOrParallelTask(atom) {
      let newStageOrParallelTask = {
        branches: [{
          name: "default",
          steps: [this.generateStep(atom)]
        }]
      };
      if (this.isAddParallelTask) {
        newStageOrParallelTask.name = "并行任务";
        // 新增并行任务
        if (this.originIsParallel) {
          // 原来已经为并行阶段
          this.pipeline.stages[this.currentStageIndex].parallel.push(newStageOrParallelTask);
        } else {
          let parallelObj = {
            name: "并行阶段",
            parallel: [this.pipeline.stages[this.currentStageIndex], newStageOrParallelTask]
          };
          this.pipeline.stages.splice(this.currentStageIndex, 0, parallelObj);
        }
        this.editStageOrParallelTask(newStageOrParallelTask, this.currentStageIndex, this.pipeline.stages[this.currentStageIndex].parallel.length - 1);
      } else {
        // 新增阶段
        newStageOrParallelTask.name = "新阶段";
        this.pipeline.stages.splice(this.currentStageIndex, 0, newStageOrParallelTask);
        this.editStageOrParallelTask(newStageOrParallelTask, this.currentStageIndex, -1);
      }
      this.showAtomCard = false;
    },
    cancelAddStage() {
      this.showAtomCard = false;
      this.pipeline.stages.splice(this.currentStageIndex, 1);
    },
    deleteStageOrParallelTask() {
      if (this.currentParallelTaskIndex < 0) {
        // 删除阶段
        this.pipeline.stages.splice(this.currentStageIndex, 1);
      } else {
        // 删除并行任务
        let parallel = this.pipeline.stages[this.currentStageIndex].parallel;
        parallel.splice(this.currentParallelTaskIndex, 1);
        if (parallel.length <= 1) {
          // 转换为单stage
          this.pipeline.stages.splice(this.currentStageIndex, 1, parallel[0]);
        }
      }
      this.showStageOrParallelTaskDrawer = false;
    },
    // 并行阶段相关方法
    showAddParallelTask(index) {
      this.$set(this.showAddParallelTaskSwitch, index, true);
    },
    hiddenAddParallelTask(index) {
      this.$set(this.showAddParallelTaskSwitch, index, false);
    },
    addParallelTask(index, originIsParallel) {
      this.currentStageIndex = index;
      this.originIsParallel = originIsParallel;
      this.showAtomCard = true;
      this.isParallelTask = true;
    },
    cancelAddParallelTask(index) {
      this.$Message.info("取消添加组件");
      this.showAtomCard = false;
    },
    addStep(atomIdentifier) {
      for (let atom of constant.ALL_PIPELINE_ATOM) {
        if (atomIdentifier == atom.identifier) {
          this.currentStageOrParallelTask.branches[0].steps.push(this.generateStep(atom))
          break;
        }
      }

    },
    stepDataChanged(stepData, argData) {
      for (let arg of stepData.arguments) {
        arg.value.value = argData[arg.key];
      }
    },
    generateStep(atom) {
      return {
        name: atom.identifier,
        arguments: atom.parameters.map(item => {
          return {
            key: item.name_en,
            value: {
              isLiteral: item.isLiteral,
              value: item.default
            }
          }
        })
      }
    },
    saveStageOrParallelTask() {
      this.showStageOrParallelTaskDrawer = false;
      let len = this.currentStageOrParallelTask.branches[0].steps.length;
      for (let i = 0; i < len; i++) {
        this.$refs["pipelineAtom" + i][0].saveStepData();
      }
    },
    deleteStep(stepIndex) {
      this.currentStageOrParallelTask.branches[0].steps.splice(stepIndex, 1);
      this.reinitPipelineAtom = false;
      this.$nextTick(() => {
        this.reinitPipelineAtom = true;
      });
    }
  }
}

</script>
<style>
.pipeline .ivu-tabs {
  overflow: visible !important;
}

.pipeline-flow-job {
  width: 100%;
  background-color: rgba(240, 240, 240, .5);
}

.pipeline-job-parent-div {
  min-width: 300px;
  background-color: rgba(240, 240, 240, .5);
  display: table-cell;
}

.pipeline-job-add-new {
  min-width: 200px;
  background-color: rgba(240, 240, 240, .5);
  display: table-cell;
}

.pipeline-job-container {
  width: 80%;
  height: 745px;
  float: left;
}

.pipeline-job-stages {
  width: 100%;
  margin: 0 auto;
  height: calc(100% - 56px);
}

.pipeline-job-stage-step {
  width: 100%;
  height: 72px;
  position: relative;
}

.pipeline-job-stage-step-capsule:before {
  content: "";
  position: absolute;
  top: -75%;
  left: 0;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
  height: 100%;
}

.pipeline-job-stage-step-capsule-first:before {
  content: "";
  position: absolute;
  top: -75%;
  left: 0;
  /*border-left: 1px solid #d9d9d9;*/
  /*border-right: 1px solid #d9d9d9;*/
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
  height: 100%;
}

.pipeline-job-stage-step-capsule-latest:before {
  content: "";
  position: absolute;
  top: -75%;
  left: 0;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  width: 100%;
  height: 100%;
}

.pipeline-job-stage-step-content {
  /*min-width: 100px;*/
  width: 80%;
  background-color: rgb(240, 240, 240);
  border: none;
  border-radius: 36px;
  cursor: pointer;
  position: relative;
}

.pipeline-job-stage-step-content-add {
  /*min-width: 100px;*/
  width: 80%;
  background-color: rgb(240, 240, 240);
  /*border: 1px dashed #515a6e;*/
  border-radius: 36px;
  cursor: pointer;
  position: relative;
}

.step-content {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 36px;
  height: 36px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 20;
}

.step-content:hover {
  color: #2d8cf0;
  border: 1px solid #2d8cf0;
}

.step-content-add {
  background: #fff;
  border: 1px dashed #e5e5e5;
  border-radius: 36px;
  height: 36px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 20;
}

.step-content-add:hover {
  color: #2d8cf0;
  border: 1px solid #2d8cf0;
}

.pipeline-job-stage-title {
  margin: 12px 0 20px 0;
  position: relative;
  cursor: unset;
}

.pipeline-job-split {
  width: 20%;
  float: left;
  height: 745px;
  text-align: center;
}

.pipeline-job-add-btn:before {
  content: "";
  height: 100%;
  border-left: 1px solid #d9d9d9;
  position: absolute;
}

.pipeline-job-add-btn:after {
  content: "";
  width: 100%;
  border-top: 1px solid #d9d9d9;
  position: absolute;
  margin-left: -50%;
  top: 73px;
}

.pipeline-job-add-btn {
  position: relative;
  cursor: pointer;
  color: #8c8c8c;
  height: 100%;
}

.pipeline-job-add-btn-first:before {
  content: "";
  height: 100%;
  border-left: 1px solid #d9d9d9;
  position: absolute;
}

.pipeline-job-add-btn-first:after {
  content: "";
  width: 50%;
  border-top: 1px solid #d9d9d9;
  position: absolute;
  top: 73px;
}

.pipeline-job-add-btn-first {
  position: relative;
  cursor: pointer;
  color: #8c8c8c;
  height: 100%;
}

.pipeline-job-add-icon {
  position: absolute;
  top: 62.5px;
  margin-left: -11px;
  z-index: 20;
}

.demo-drawer-footer {
  width: 100%;
  border-top: 1px solid #e8eaec;
  position: absolute;
  bottom: 0;
  background: #ffffff;
  height: 60px;
  margin-left: -16px;
}

.pipeline-job-body {
  position: absolute;
  top: 0;
  left: 0;
  height: 745px;
  width: auto;
  min-width: calc(100%);
  float: left;
  background-color: rgb(240, 240, 240);
}

.pipeline-job-add {
  width: 60%;
  background: #f0f0f0;
  border: 1px solid #515a6e;
  margin: 5px 10px 20px 10px;
  border-radius: 10px;
  cursor: pointer;
}

.stage-edit-p {
  font-size: 14px;
}

.step-add-icon {
  display: inline-block;
  margin: 3px 0 0 0;
}

.step-add-h {
  margin: 5px 0;
  font-weight: unset;
  display: inline-block;
}

.pipeline-btn-primary {
  border-radius: 0;
  border-width: 0;
  border-color: transparent;
  cursor: pointer;
}

.pipeline-btn-primary:hover {
  color: #0171c2;
  background-color: transparent;
  border-color: transparent;
  text-decoration: none;
}

.trigger-rule-container {
  text-align: left;
  margin-left: 60px;
}

.trigger-rule-code-update {}

.trigger-rule-event {
  padding-left: 110px;
  margin-top: 20px;
}
.trigger-rule-side {
  font-weight: 500;
  font-size: 16px;
  color: #323a45;
  margin-right: 20px;
}
.trigger-rule-content {
  float: left
}

</style>
