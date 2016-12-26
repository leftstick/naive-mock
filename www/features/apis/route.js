import Apis from './index';
import ApiCreate from './apiCreate';
import ApiModification from './apiModification';

export default [{
    path: '/apimanager',
    component: Apis,
    isDefault: true
}, {
    path: '/apimanager/new',
    component: ApiCreate
}, {
    path: '/apimanager/edit/:id',
    component: ApiModification
}];
