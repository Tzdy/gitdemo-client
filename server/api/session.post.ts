export default defineEventHandler(async (event) => {
    const { username, password } = await useBody<{ username: string, password: string}>(event)

    console.log(username, password)
    return 'post'
})

