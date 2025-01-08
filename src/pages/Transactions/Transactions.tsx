import { useLocation } from 'react-router-dom';
import { LayoutTransactions } from '../../components/LayoutTransactions/LayoutTransactions';
import IBreadcrumb from '../../models/BreadcrumbModel';
import style from './Transactions.module.scss';
import { useState } from 'react';

function Transactions() {
    var route = "";
    function GetIconForRoute(): string {
        const location = useLocation();
        if (location.pathname.includes("/bank-slip")) {
            route = "/bank-slip";
            return "bi bi-upc-scan";
        } else if (location.pathname.includes("/cards")) {
            route = "/cards";
            return "bi bi-credit-card";
        } else {
            return "";
        }
    }

    const breadcrumb: IBreadcrumb = {
        name: localStorage.getItem('nameCardPai') ?? "",
        icon: GetIconForRoute(),
        route: route
    }

    return (
        <>
            <LayoutTransactions
                breadcrumb={breadcrumb}
                functionAdd={true}
                functionReload={true}
                functionSearch={true}
            />
        </>
    )
}

export { Transactions }