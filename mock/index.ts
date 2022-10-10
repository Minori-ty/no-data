import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
    {
        url: '/api/get',
        method: 'get',
        response: ({ query }) => {
            const data = Mock.mock({
                'x|10': [() => Mock.Random.cname()],
                'y|10': [() => Mock.Random.natural(1, 100)],
            })
            if (Math.random() > 0.5) {
                return {
                    xAxis: [],
                    yAxis: [],
                }
            }
            return {
                xAxis: data.x,
                yAxis: data.y,
            }
        },
    },
] as MockMethod[]
