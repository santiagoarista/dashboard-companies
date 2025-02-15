import React from "react";
import { HeaderCompanies } from "./components/HeaderCompanies";
import { ListCompanies } from "./components/Listcompanies";

export default function Companies(){
    return(
        <div>
            <HeaderCompanies/>
            <ListCompanies/>
        </div>
    )
}