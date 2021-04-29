// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { LoggedVisit, SignedInUser } = initSchema(schema);

export {
  LoggedVisit,
  SignedInUser
};