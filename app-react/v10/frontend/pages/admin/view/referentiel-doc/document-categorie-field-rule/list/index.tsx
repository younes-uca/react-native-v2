import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import DocumentCategorieFieldRulesList from 'app/component/admin/view/referentiel-doc/document-categorie-field-rule/list/document-categorie-field-rule-list-admin.component';
import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';

const DocumentCategorieFieldRules: NextPageWithLayout = () => {
    return <DocumentCategorieFieldRulesList />
}

DocumentCategorieFieldRules.getLayout = function getLayout(page: ReactNode) {
    return (
    <AuthGuard>
        <Layout>
            {page}
        </Layout>
    </AuthGuard>
    )
}

export default DocumentCategorieFieldRules;
