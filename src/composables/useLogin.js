/* signup composables yazıyoruz */
import { ref } from "vue";
/* auth u da çağırıyoruz. */
import { projectAuth } from '../firebase/config';

/* error için const tanımladık */
const error = ref(null);

const login = async (email, password) => {
    error.value = null;

    try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password);
        error.value = null;
        return res;
    } catch (err) {
        console.log(err.value);
        error.value = 'Incorrect login credentials';        
    }
};
const useLogin = () =>{
    return {login, error};
};
export default useLogin;