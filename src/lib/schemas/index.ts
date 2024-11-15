import * as tagSchemas from './tagSchemas'
import * as contactSchemas from './contactSchemas'
import * as userSchemas from './userSchemas'
import * as meetingSchemas from './meetingSchemas'

export * from './tagSchemas'
export * from './contactSchemas'
export * from './userSchemas'
export * from './meetingSchemas'

export default {
  ...tagSchemas,
  ...contactSchemas,
  ...userSchemas,
  ...meetingSchemas,
}
