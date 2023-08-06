import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import DocumentFieldStatesList from 'app/component/admin/view/referentiel-doc/document-field-state/list/document-field-state-list-admin.component';
import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';

const DocumentFieldStates: NextPageWithLayout = () => {
    return <DocumentFieldStatesList />
}

DocumentFieldStates.getLayout = function getLayout(page: ReactNode) {
    return (
    <AuthGuard>
        <Layout>
            {page}
        </Layout>
    </AuthGuard>
    )
}

export default DocumentFieldStates;
