import * as cities from './cities'
import * as groups from './groups'
import * as messages from './messages'
import * as photos from './photos'
import * as schools from './schools'
import * as users from './users'

export * from './cities'
export * from './groups'
export * from './messages'
export * from './photos'
export * from './schools'
export * from './users'

export default {
  ...cities,
  ...groups,
  ...messages,
  ...photos,
  ...schools,
  ...users,
}