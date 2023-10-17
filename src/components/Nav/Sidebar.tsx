function Sidebar() {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <p> page content</p>
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content pt-20">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
