const serviceDemon = require('../../service/demon')

const add = async (ctx) => {
    const { name, level, nature } = ctx.params
    await serviceDemon.add(name, level, nature)
    ctx.body = { success: true }
}

module.exports = {
    add,
}