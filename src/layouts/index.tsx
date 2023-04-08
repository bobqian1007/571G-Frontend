import { Link, Outlet,useAppData,useLocation } from 'umi';
import {ProLayout} from "@ant-design/pro-layout";

export default function Layout() {
    const {clientRoutes} = useAppData();
    const location = useLocation();
    return (
        <ProLayout
            route={clientRoutes[0]}
            location={location}
            title={'FundChain'}
            logo={"https://github.com/bobqian1007/pictureBed/raw/main/571GProject/logo.png"}
            menuItemRender={(menuItemProps, defaultDom) => {
                if (menuItemProps.isUrl || menuItemProps.children) {
                    return defaultDom;
                }
                if (menuItemProps.path && location.pathname !== menuItemProps.path) {
                    return (
                        <Link to={menuItemProps.path} target={menuItemProps.target}>
                            {defaultDom}
                        </Link>
                    );
                }
                return defaultDom;
            }}
        >
            <Outlet />
        </ProLayout>
    );
}
