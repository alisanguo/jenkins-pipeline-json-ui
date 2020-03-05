<template>
  <Collapse simple>
    <Panel>
      {{structData.name}}
      <p slot="content">
        <Form :model="argData">
          <FormItem v-for="(item,index) in structData.parameters" :key="index" :label="item.name_cn">
            <Input v-model="argData[item.name_en]" :placeholder="item.description" v-if="item.form_item=='input'"></Input>
            <Input v-model="argData[item.name_en]" type="textarea" :placeholder="item.description" v-if="item.form_item=='textarea'"></Input>
            <Select v-model="argData[item.name_en]" v-if="item.form_item == 'select'" :placeholder="item.description">
              <Option v-for="(option, index1) in item.options" :key="index1" value="option.value">{{ option.label }}</Option>
            </Select>
            <Select v-model="argData[item.name_en]" mutiple v-if="item.form_item == 'select_multiple'" :placeholder="item.description">
              <Option v-for="(option, index1) in item.options" :key="index1" value="option.value">{{ option.label }}</Option>
            </Select>
          </FormItem>
        </Form>
      </p>
    </Panel>
  </Collapse>
</template>
<script>
import constant from '../utils/constant.js'
export default {
  name: "pipelineAtom",
  props: {
    stepData: {
      type: Object,
      default: {}
    }
  },
  data: () => {
    return {
      structData: {},
      argData: {

      }
    }
  },
  watch: {
    
  },
  created() {
    this.init(this.stepData);
  },
  methods: {
    init(step) {
      for (let atom of constant.ALL_PIPELINE_ATOM) {
        if (step.name == atom.identifier) {
          this.structData = atom;
          break;
        }
      }
      for (let arg of this.structData.parameters) {
        this.$set(this.argData, arg.name_en, this.getArgValueFromStep(step, arg.name_en));
      }
    },
    getArgValueFromStep(step, key) {
      for (let arg of step.arguments) {
        if (arg.key == key) {
          return arg.value.value;
        }
      }
      return null;
    },
    saveStepData() {
      this.$emit("dataChanged", this.stepData, this.argData);
    }
  }
}

</script>
<style>
</style>
