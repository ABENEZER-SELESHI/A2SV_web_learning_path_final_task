import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";


const Nav = async () => {
    const session = await getServerSession(options)
    return (
        <header className="bg-gray-600 text-gray-100">
            <nav className="flex justify-between items-center w-full px-10 py-4">
                <h1>Job Searcher</h1>
                <div className="flex gap-10">
                    <Link href="/">Home</Link>
                    <Link href="/bookmarks">Bookmarks</Link>
                    {session ? <Link href="/api/auth/signout?callbackUrl=/">Logout</Link> : <Link href="/SignIn?callbackUrl=/">Login</Link>}
                </div>
            </nav>
        </header>
    )
}

export default Nav;