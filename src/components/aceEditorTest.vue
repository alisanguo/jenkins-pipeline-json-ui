<template>
  <editor v-model="content" @init="editorInit" lang="groovy" theme="chrome" width="1500" height="1000"></editor>
</template>
<script type="text/javascript">


// use in component
export default {
  components: {
    editor: require('vue2-ace-editor'),
  },
  data() {
    return {
      content: `pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]],
                                                                    userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
    stage('编译') {
      steps {
        sh './mvnw package -Dmaven.test.skip=true'
      }
    }
    stage('并行阶段 3') {
      parallel {
        stage('单元测试') {
          post {
            always {
              junit 'target/surefire-reports/*.xml'

            }

          }
          steps {
            sh './mvnw test'
          }
        }
        stage('并行shell') {
          steps {
            sh 'cd /'
            node(label: 's') {
              sh 'cd /test-son'
            }

          }
        }
      }
    }
    stage('打包镜像') {
      steps {
        sh "docker build -t {ARTIFACT_IMAGE}:{env.GIT_BUILD_REF} ."
        sh "docker tag {ARTIFACT_IMAGE}:{env.GIT_BUILD_REF} {ARTIFACT_IMAGE}:latest"
      }
    }
    stage('推送到制品库') {
      steps {
        script {
          docker.withRegistry("https://{ARTIFACT_BASE}", "{env.DOCKER_REGISTRY_CREDENTIALS_ID}") {
            docker.image("{ARTIFACT_IMAGE}:{env.GIT_BUILD_REF}").push()
            docker.image("{ARTIFACT_IMAGE}:latest").push()
          }
        }

      }
    }
  }
  environment {
    ENTERPRISE = 'citic_cpc'
    PROJECT = 'coding-demo'
    ARTIFACT = 'coding-demo'
    CODE_DEPOT = 'coding-demo'
    ARTIFACT_BASE = "{ENTERPRISE}-docker.pkg.coding.net"
    ARTIFACT_IMAGE = "{ARTIFACT_BASE}/{PROJECT}/{ARTIFACT}/{CODE_DEPOT}"
  }
}` 
  	}
  },
  methods: {
    editorInit: function() {
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') //language
      require('brace/mode/groovy') //language
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript') //snippet
    }
  },


}

</script>
