import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut} from "firebase/auth";

const domain = window.location.origin
const backendHost = ''

export const signUp = async (payload) => {
  const auth = getAuth()
  const { email, password, name } = payload
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // ตรงนี้ต้องยิง api ไปหาหลังบ้านแล้ว สร้าง ข้อมูลอื่นๆ เช่น name และอื่นๆ จะไปอัพเดททีหลังในหน้า setting
    /*await axios.post(`${backendHost}/api/v1/user`, {
      name,
      email
    }, {
      headers: {
        // อันนี้เป็น token ที่ต้องให้หลังบ้าน เอา firebase-admin เรียกข้อมูลมาเช็คอีกทีว่า ได้สร้าง account ที่ firebase รึยัง
        'Authorization': token
      }
    })*/

    // auto sign-in
    await signIn({email, password})

    return userCredential.user
  } catch (err) {
    if (err?.message) {
      alert(err.message)
    }
    throw err
  }
}

export const signIn = async ({email, password}) => {
  const auth = getAuth()

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential.user
  } catch (err) {
    if (err?.message) {
      alert(err.message)
    }
    return null
  }
}

export const signOut = () => {
  const auth = getAuth()

  return firebaseSignOut(auth)
}
