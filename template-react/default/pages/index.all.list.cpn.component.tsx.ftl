import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import ${pojo.name}sList from 'app/component/${role.name}/view/${pojo.subModule.name}/${pojo.formatedUrl?uncap_first}/list/${pojo.formatedUrl?uncap_first}-list-${role.name}.component';
import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';

const ${pojo.name}s: NextPageWithLayout = () => {
    return <${pojo.name}sList />
}

${pojo.name}s.getLayout = function getLayout(page: ReactNode) {
    return (
    <AuthGuard>
        <Layout>
            {page}
        </Layout>
    </AuthGuard>
    )
}

export default ${pojo.name}s;
