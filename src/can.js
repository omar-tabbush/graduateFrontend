import { Ability, AbilityBuilder, defineAbility } from "@casl/ability";
import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { store } from "./redux/store";
export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export default defineAbility((can, cannot) => {
  const { isAuth } = store.getState();
  if (isAuth?.auth === "admin") {
    can("manage", "all");
  } else if (isAuth?.auth === "client") {
    can("read", "designs");
    can("manage", "ownUser");
    can("manage", "ownUserData");
  } else {
    can("read", "designs");
  }
});

export function updateAbility(ability, role) {
  const { can, rules } = new AbilityBuilder(Ability);
  if (role === "admin") {
    can("manage", "all");
  } else if (role === "client") {
    can("read", "designs");
    can("manage", "ownUser");
    can("manage", "ownUserData");
  } else {
    can("read", "designs");
  }

  ability.update(rules);
}
