"use client"
import { getCsrfToken, signIn } from "next-auth/react"
import { useRef } from "react"

export default function LoginPage() {

  const email = useRef('')
  const password = useRef('')

  const submit = async()=>{
    const result = await signIn("credentials", {
      email:email.current,
      password:password.current,
      redirect:true,
      callbackUrl:'/'
    })
  }
  return (
    <form method="post">
      <label>
        Email
        <input name="email" type="email" onChange={(e)=>{email.current = e.target.value}}/>
      </label>
      <label>
        Password
        <input name="password" type="password" onChange={(e)=>{password.current = e.target.value}}/>
      </label>
      <button onClick={submit}>Sign in</button>
    </form>
  )
}

