import * as v from 'valibot'

export const userNameSchema = v.string([v.minLength(1)])
export const emailSchema = v.string([v.email()])
// export const passwordSchema = v.string([v.minLength(3)])
// export const dateSchema = v.date([v.minValue(new Date())])
