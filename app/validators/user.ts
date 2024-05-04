import vine from '@vinejs/vine'


export const loginUserValidator = vine.compile(
    vine.object({
      login_type: vine.enum(['MOBILE','EMAIL']),
      username: vine.string().trim(),
      password: vine.string().trim().escape()
    })
  )


  // createUser
  export const storeUserValidator = vine.compile(
    vine.object({
      reg_type: vine.enum(['MOBILE','EMAIL']),
      mobile: vine.string().trim(),
      firstname: vine.string().trim().escape(),
      lastname: vine.string().trim().escape(),
      password: vine.string().trim().escape(),
    })
  )