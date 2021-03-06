// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
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
    api: 'http://localhost:8080/api',
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
        updateProductStockPrice(oid, pid) { return `/organization/${oid}/product/update/${pid}/price`; },
        removeProductStock(oid, pid) { return `/organization/${oid}/product/remove/${pid}`; },
        hideProductStock(oid, pid) { return `/organization/${oid}/product/hide/${pid}`; },

        getOrganizationLocations(oid) { return `/organization/${oid}/location`; },
        createOrganizationLocation(oid) { return `/organization/${oid}/location/create`; },
        updateOrganizationLocation(oid, locid) { return `/organization/${oid}/location/update/${locid}`; },
        deleteOrganizationLocation(oid, locid) { return `/organization/${oid}/location/delete/${locid}`; },

        getOrganizationTransactions(oid) { return `/organization/${oid}/transaction`; },
        getOneTransaction(tid) { return `/transaction/${tid}`; },
        addSimpleTransaction: `/transaction/create`,
        orderTransaction(tid) { return `/transaction/update/${tid}`; },

        getOrganizationEmployees(oid) { return `/organization/${oid}/employees`; },
        fireOneEmployee(oid, uid) { return `/organization/${oid}/employees/fire/${uid}`; },
        organizationInviteRequestCreate: `/requests/organization/create`,
        organizationInviteRequestGetone(rid) {return `/requests/organization/${rid}`; },
        organizationInviteRequestHandle(rid) { return `/requests/organization/${rid}`; },
        organizationInviteRequestAutoAccept(email) { return `/requests/organization/auto/${email}`; }
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
