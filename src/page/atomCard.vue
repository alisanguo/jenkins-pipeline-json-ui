<template>
  <div>
    <div class="atom-card-search">
      <Input prefix="ios-search" placeholder="请输入组件类型" style="width: 100%" />
    </div>
    <div class="atom-card-body">
      <!--  <div class="atom-card-body-sidebar">
        <Anchor show-ink>
          <AnchorLink href="#basic_usage" title="通用组件" /></AnchorLink>
        </Anchor>
      </div> -->
      <div class="atom-card-body-content">
        <div class="atom-card-group">
         <!--  <div class="atom-card-group-title">通用组件</div> -->
          <div class="atom-card-group-content">
            <div v-for="(atom, index) in allAtomList" :key="index" @click="atomSelected(atom)" class="atom-card-atom">
              <div class="atom-left">
                <img src="../assets/logo.png">
              </div>
              <div class="atom-right">
                <div class="atom-name">{{atom.name}}</div>
                <div class="atom-desc"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import constant from '../utils/constant.js'
export default {
  props: {

  },
  data: () => {
    return {
      allAtomList: []
    }
  },
  created() {
    this.allAtomList = constant.ALL_PIPELINE_ATOM;
  },
  methods: {
    atomSelected(atom) {
      this.$emit("atomSelected", atom);
    }
  }
}

</script>
<style>
.atom-card-search {
  margin: 12px 20px;
  width: 95%;
}

.atom-card-body {
  height: 500px;
  display: block;
}

,
.atom-card-body-sidebar {
  width: 180px;
  display: inline-block;
  max-height: 100%;
  height: 100%;
  overflow: auto;
}

.atom-card-body-content {
  <!--width: calc(100% - 180px);-->
  display: inline-block;
  max-height: 100%;
  height: 100%;
  overflow: auto;

}

.atom-card-group-title {
  color: #262626;
  font-weight: 500;
}

.atom-card-atom {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-left: 12px;
  margin-bottom: 12px;
  display: inline-block;
  width: 240px;
  padding: 12px;
  cursor: pointer;
}

.atom-card-atom:hover {
  border-color: #1b9aee;
}

.atom-left img {
  width: 40px;
  height: 40px;
}

</style>
