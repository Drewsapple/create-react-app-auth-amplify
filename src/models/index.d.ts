import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class LoggedVisit {
  readonly id: string;
  readonly name?: string;
  readonly signin?: string;
  readonly signout?: string;
  readonly contacts?: (string | null)[];
  readonly location?: string;
  constructor(init: ModelInit<LoggedVisit>);
  static copyOf(source: LoggedVisit, mutator: (draft: MutableModel<LoggedVisit>) => MutableModel<LoggedVisit> | void): LoggedVisit;
}

export declare class SignedInUser {
  readonly id: string;
  readonly name: string;
  readonly signin?: string;
  readonly location?: string;
  constructor(init: ModelInit<SignedInUser>);
  static copyOf(source: SignedInUser, mutator: (draft: MutableModel<SignedInUser>) => MutableModel<SignedInUser> | void): SignedInUser;
}