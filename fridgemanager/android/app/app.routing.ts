import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ListComponent } from "./pages/list/list.component";
import { EditComponent } from "./pages/edit/edit.component";
import { AddComponent } from "./pages/add/add.component";
import { SettingsComponent } from "./pages/settings/settings.component";

const routes: Routes = [
    { path: "", redirectTo: "/list", pathMatch: "full" },
    { path: "list", component: ListComponent },
    { path: "edit/:id", component: EditComponent },
    { path: "add", component: AddComponent },
    { path: "add/:type", component: AddComponent },
    { path: "settings", component: SettingsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }