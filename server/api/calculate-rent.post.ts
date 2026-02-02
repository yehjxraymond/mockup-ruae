export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const response = await $fetch('https://www.rently-uae.com/api/calculate-second-version', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: {
        annualRent: body.annualRent,
        cheque: body.cheque
      }
    })

    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to calculate rent'
    })
  }
})
