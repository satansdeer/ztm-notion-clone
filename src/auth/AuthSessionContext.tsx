import { supabase } from "../supabaseClient"
import { Session } from "@supabase/supabase-js"
import { createContext, ReactNode, useState, useEffect, useContext } from "react"

type AuthSessionContextValue = {
	session: Session | null;
	loading: boolean;
}

const AuthSessionContext = createContext<AuthSessionContextValue>({} as AuthSessionContextValue)


type AuthSessionProviderProps = {
	children: ReactNode
}

export const AuthSessionProvider = ({children}: AuthSessionProviderProps) => {
	const [ session, setSession ] = useState<Session | null>(null)
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		const auth = async () => {
			const {data, error } = await supabase.auth.getSession()
			if(data.session){
				setSession(data.session)
				setLoading(false)
			} else {
				console.log(error)
			}
		}
		auth()
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
			setLoading(false)
		})
	}, [])

	return (
		<AuthSessionContext.Provider value={{ session, loading }}>
			{children}
		</AuthSessionContext.Provider>
	)
}

export const useAuthSession = () => useContext(AuthSessionContext)
