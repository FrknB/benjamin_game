import { ref } from "vue";
import { projectAuth } from '../firebase/config';

const error = ref(null);
const signup = async (email, password,displayName) => {
    error.value = null;
    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password);
        if (!res) {
            /* throw hata gelirse hata fırlatmak için kullanıyoruz */
            throw new Error("Could not complate the signup!");
        }
        /* kullanıcı adını da tutması için bunu yaptık güncelledik*/
        await res.user.updateProfile({ displayName });
        error.value = null;
        return res;
    } catch (err) {
        console.log(err.message);
        error.value = err.message;
    }
};
const useSignup = () => {
    return { error, signup };
};
export default useSignup;