const checkHomeData = (homeData) => {
    const tmpToday = homeData.today
    const tmpYesterday = homeData.yesterday
    const tmpSeven = homeData.week
    const tmpClient = homeData.total
    const today = [
        {
            name: '交易额',
            value: tmpToday.turnover
        },
        {
            name: '总单量',
            value: tmpToday.totalOrder
        },
        {
            name: '超时单',
            value: tmpToday.overTimeOrder
        },
        {
            name: '用户取消',
            value: tmpToday.cancelOrder
        },
        {
            name: '交通费',
            value: tmpToday.transFee
        },
        {
            name: '优惠卷',
            value: tmpToday.couponFee
        }
    ]
    const seven = {
        day: tmpSeven.map(item => item.time),
        orders: tmpSeven.map(item => item.totalOrder),
        pay: tmpSeven.map(item => item.turnover)
    }
    const yesterday = [
        {
            name: '交易额',
            value: tmpYesterday.turnover
        },
        {
            name: '总单量',
            value: tmpYesterday.totalOrder
        },
        {
            name: '超时单',
            value: tmpYesterday.overTimeOrder
        },
        {
            name: '用户取消',
            value: tmpYesterday.cancelOrder
        },
        {
            name: '交通费',
            value: tmpYesterday.transFee
        },
        {
            name: '优惠卷',
            value: tmpYesterday.couponFee
        }
    ]
    const userCount = homeData.userCount
    const techCount = homeData.techCount
    const client = {
        turnover: tmpClient.turnover,
        benefit: tmpClient.benefit,
        transFee: tmpClient.transFee,
        couponFee: tmpClient.couponFee,
        totalOrder: tmpClient.totalOrder,
        successOrder: tmpClient.successOrder,
        overTimeOrder: tmpClient.overTimeOrder,
        cancelOrder: tmpClient.cancelOrder
    }
    return {
        today,
        seven,
        yesterday,
        userCount,
        techCount,
        client
    }
}

// 过滤选择的菜单，menus为所有的，data为已选择的
const checkMenus = (menus, data) => {
    const result = []
    const first = []
    const second = []
    let str = ''
    data.forEach(item => {
        str += item.route.name
        if (item.children) {
            first.push(item)
        } else {
            second.push(item)
        }
    })

    if (first.length === data.length) return first

    // 第一次循环，将一级菜单的数据加入结果集
    menus.forEach(menu => {
        if (str.indexOf(menu.route.name) !== -1) {
            menu.children = []
            result.push(menu)
        }
    })

    result.forEach(item => { // 2
        second.forEach(i => {
            if (item.route.name === i.route.name) {
                item.children.push(i)
            }
        })
    })

    return result
}

const checkProject = (projectList, projectIds) => {
    if (projectIds.length === 0) return []
    let result = []
    projectIds.forEach(item => {
        projectList.forEach(i => {
            if (item === i.projectId) {
                result.push({
                    id: item,
                    name: i.name
                })
            }
        })
    })
    return result
}


export default {
    checkHomeData, checkMenus, checkProject
}
