import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalsComponent } from './locals/locals.component';
import { LocalItemComponent } from './local-item/local-item.component';

const routes: Routes = [
  { path: 'locals', component: LocalsComponent },
  { path: 'local/:name', component: LocalItemComponent},
  // { path: 'abm-local', component:   },
  // { path: 'crear-local', component:   },
  // { path: 'listar-producto/:idL', component:   },
  // { path: 'crear-producto/:idL', component:  },
  // { path: 'editar-producto/:idL/:idP', component:   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalesRoutingModule { }
