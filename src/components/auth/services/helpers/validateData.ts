import * as v from 'valibot'

export const userNameSchema = v.string([v.minLength(1)])
export const codeSchema = v.string([v.length(36)])
export const emailSchema = v.string([v.email()])
