import * as messageSchemas from './messageSchemas'
import * as photoSchemas from './photoSchemas'
import * as userSchemas from './userSchemas'
import * as groupSchemas from './groupSchemas'
import * as citySchemas from './citySchemas'
import * as roleSchemas from './roleSchemas'
import * as schoolSchemas from './schoolSchemas'


export * from './messageSchemas'
export * from './photoSchemas'
export * from './userSchemas'
export * from './groupSchemas'
export * from './roleSchemas'
export * from './schoolSchemas'
export * from './citySchemas'


export default {
  ...messageSchemas,
  ...photoSchemas,
  ...userSchemas,
  ...groupSchemas,
  ...roleSchemas,
  ...schoolSchemas,
  ...citySchemas,
}
