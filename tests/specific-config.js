import testConfig from './test-config'
import {filePathToConfigObj} from './passing-configs'
import {resolve} from 'path'

const configToTest = resolve(__dirname, './passing-configs/formly.test')

const configObject = filePathToConfigObj(configToTest)

testConfig(configObject)


