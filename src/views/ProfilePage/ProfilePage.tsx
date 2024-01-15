import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider"

export default function ProfilePage() {
    const {userData} = useAuthProvider();
    return (
        <div>{JSON.stringify(userData)}</div>
    )
}