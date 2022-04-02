import { AppData } from "./index";

export default function reducer(
  state: AppData,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, currentUser: action.payload };
    default:
      return { ...state };
  }
}
