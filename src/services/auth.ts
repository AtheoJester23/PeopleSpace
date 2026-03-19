import supabase from "../config/supabaseClient"

export const logout = async () => {
    try {  
        const {error} = await supabase.auth.signOut();
        
        if(error) throw error;
    } catch (error) {
        console.log((error as Error).message)
    }
}

export const getSession = async () => {
    try {
        const { data: authData, error: authError } = await supabase.auth.getSession();

        if(authError) throw authError;
        
        if(!authData.session) return null;

        const {data, error} = await supabase.from('profiles').select().eq("id", authData.session?.user.id);

        if(error) throw error;

        return {
            session: authData.session,
            data: data[0] 
        }

    } catch (error) {
        console.log((error as Error).message)
        return null;
    } 
}