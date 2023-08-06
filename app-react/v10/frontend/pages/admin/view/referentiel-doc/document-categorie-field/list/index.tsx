import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import DocumentCategorieFieldsList from 'app/component/admin/view/referentiel-doc/document-categorie-field/list/document-categorie-field-list-admin.component';
import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';

const DocumentCategorieFields: NextPageWithLayout = () => {
    return <DocumentCategorieFieldsList />
}

DocumentCategorieFields.getLayout = function getLayout(page: ReactNode) {
    return (
    <AuthGuard>
        <Layout>
            {page}
        </Layout>
    </AuthGuard>
    )
}

export default DocumentCategorieFields;
