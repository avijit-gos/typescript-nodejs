/** @format */

import bcrypt from "bcrypt";

export const comparePassowrd = async (password: string, userPassowrd: string): Promise<boolean> => {
  const result:boolean = await bcrypt.compare(password, userPassowrd);
  return result;
};
