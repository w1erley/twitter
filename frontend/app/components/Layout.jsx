import getCurrentUser from "../api/actions/getCurrentUser";

import FollowBox from "./layout/FollowBox";
import Sidebar from "./layout/Sidebar";

const Layout = async ({ children }) => {
  let username;
  const user = await getCurrentUser();

  if (user) {
    username = user.username;
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-3">
          <Sidebar username={username}/>
        </div>
          <div className="col-6">
            {children}
          </div>
        <div className="col-3">
          <FollowBox />
        </div>
      </div>
    </div>
  )
}

export default Layout;
