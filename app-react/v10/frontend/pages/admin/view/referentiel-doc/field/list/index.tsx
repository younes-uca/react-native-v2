import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import FieldsList from 'app/component/admin/view/referentiel-doc/field/list/field-list-admin.component';
import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';

const Fields: NextPageWithLayout = () => {
    return <FieldsList />
}

Fields.getLayout = function getLayout(page: ReactNode) {
    return (
    <AuthGuard>
        <Layout>
            {page}
        </Layout>
    </AuthGuard>
    )
}

export default Fields;
