import { Api } from '../services'
import { useAuth } from './useAuth'
import { User } from '../types'

const getUser = async () => {
    const appUser = await localStorage.getItem('@CaronaApp:User')

    if (appUser) {
        return (await JSON.parse(appUser)) as User
    }

    return null
}

const useRefreshToken = () => {
    const { setUser } = useAuth()

    return async () => {
        const user = await getUser()
        const refreshToken = user?.refreshToken
        const response = await Api.post('/auth/refresh-token', { refreshToken })

        // @ts-ignore
        setUser((prevState: User) => {
            const newState = { ...prevState, accessToken: response.data.accessToken }
            localStorage.setItem('@CaronaApp:User', JSON.stringify(newState))

            return newState
        })

        return response.data.accessToken
    }
}

export default useRefreshToken
