export default function MainContentFooter() {
  return (
    <div className="dropdown dropdown-top dropdown-left absolute bottom-0 right-2">
      <div tabIndex={0} role="button" className="btn btn-ghost text-sm">
        ...
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-10 menu p-2 shadow bg-base-200 rounded-box w-52"
      >
        <li>
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              title="toggle theme"
              defaultChecked={true}
              className="checkbox checkbox-accent checkbox-xs"
            />
            <span className="label-text">toggle theme</span>
          </label>
        </li>
        <li>
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              title="minimal mode"
              defaultChecked={true}
              className="checkbox checkbox-accent checkbox-xs"
            />
            <span className="label-text">minimal mode</span>
          </label>
        </li>
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
        <li>
          <label className="cursor-pointer label">
            <input
              name="worksonffline"
              type="checkbox"
              title="works offline"
              defaultChecked={true}
              className="checkbox checkbox-accent checkbox-xs"
            />
            <span className="label-text">works offline</span>
          </label>
        </li>
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
        <li>
          <label className="cursor-pointer label">
            <a href="">
              <img
                className="rounded-box"
                width="20"
                height="20"
                src="/aa-favicon.ico"
                alt="ahmad.build"
              />
            </a>
          </label>
        </li>
        <li>
          <label className="cursor-pointer label">
            <a href="">
              <img
                className="rounded-box"
                width="20"
                height="20"
                src="/aa-favicon.ico"
                alt="AdhanApp Github"
              />
            </a>
          </label>
        </li>
      </ul>
    </div>
  );
}
