import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '156rdx1d',
    dataset: 'production'
  },
  deployment: {
    appId: 'av596cxp8ox22gi7ulqfae16',
    autoUpdates: true,
  }
})