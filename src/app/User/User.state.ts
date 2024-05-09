import { createEntityAdapter } from "@ngrx/entity";
import { UserModel, Users } from "../Model/User.model";

export const UserAdapter = createEntityAdapter<Users>();

export const UserState: UserModel = UserAdapter.getInitialState();