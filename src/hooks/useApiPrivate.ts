import { useEffect } from 'react'

import { ApiPrivate } from '../services'
import useRefreshToken from './useRefreshToken'
import { useAuth } from './useAuth'

const useApiPrivate = () => {
    const refresh = useRefreshToken()
    const { user } = useAuth()

    useEffect(() => {
        const requestInterceptor = ApiPrivate.interceptors.request.use(
            (config) => {
                // @ts-ignore
                if (!config.headers['Authorization']) {
                    // @ts-ignore
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`
                }

                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = ApiPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

                    return ApiPrivate(prevRequest)
                }

                return Promise.reject(error)
            }
        )

        return () => {
            ApiPrivate.interceptors.request.eject(requestInterceptor)
            ApiPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [user, refresh])

    return ApiPrivate
}

export default useApiPrivate
