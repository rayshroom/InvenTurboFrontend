export const environment = {
    production: true,
    firebase: {
        apiKey: 'AIzaSyAJT1qKhwTCrjd_uWC4t4UWJoXf6S_dK2w',
        authDomain: 'inventurbo-f0eca.firebaseapp.com',
        databaseURL: 'https://inventurbo-f0eca.firebaseio.com',
        projectId: 'inventurbo-f0eca',
        storageBucket: 'inventurbo-f0eca.appspot.com',
        messagingSenderId: '216500507265',
        appId: '1:216500507265:web:ef43d619b4ac117655f380',
        measurementId: 'G-3FKLY60L44'
    },
    api: 'https://us-central1-inventurbo-f0eca.cloudfunctions.net/app/api',
    routes: {
        register: '/user/register',
        getOneProfile(uid) { return `/profile/${uid}`; },

        getAllOrganization: `/organization`,
        createOrganization: `/organization/create`,
        getAllProduct: `/product`,
        createProduct: `/product/create`,

        getUserOrganizations(uid) { return `/profile/${uid}/organization`; },
        getOrganizationProductStocks(oid) { return `/organization/${oid}/product`; },
        getOneProductStock(oid, pid) { return `/organization/${oid}/product/${pid}`; },
        addOneProductStock(oid) { return `/organization/${oid}/product/add/`; },
        updateOneProductStock(oid, pid) { return `/organization/${oid}/product/update/${pid}`; },
        getOrganizationTransactions(oid) { return `/organization/${oid}/transaction`; },
        getOneTransaction(tid) { return `/transaction/${tid}`; },
        addSimpleTransaction: `/transaction/create`,
        orderTransaction(tid) { return `/transaction/update/${tid}`; },
    },
};
