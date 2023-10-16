
//css from https://daisyui.com/components/navbar/
function Navbar() {

    return (
        <>
            <div className="navbar bg-neutral text-neutral-conten">
                <div className="dropdown">
                    <label tabindex="0" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabindex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Outline View</a></li>
                        <li><a>Help</a></li>
                        <li><a>Hotkeys</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Arborist</a>
            </div>
        </>
    )
}

export default Navbar