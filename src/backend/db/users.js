import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 2220,
    firstName: "Asif",
    lastName: "Siddique",
    username: "asif",
    password: "asifSiddique",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
