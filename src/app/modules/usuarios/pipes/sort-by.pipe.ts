import {Pipe, PipeTransform} from '@angular/core';
import {UserListResponse} from "../../../core/models/user.model";

@Pipe({
  name: 'sortByPipe'
})
export class SortByPipe implements PipeTransform {

  transform([...users]: UserListResponse[], sortBy: string , order:string): UserListResponse[] {
    switch (sortBy) {
      case 'nombre':
          return users.sort(
            (userPrevious, userNext) => {
              return (order === 'ascendent') ?
                ((userPrevious.name > userNext.name) ? 1 : -1):
                ((userPrevious.name > userNext.name) ? -1 : 1);
            });
        break;
      case 'lastName':
          return users.sort(
            (userPrevious, userNext) => {
              return (order === 'ascendent') ?
                ((userPrevious.lastName > userNext.lastName) ? 1 : -1):
                ((userPrevious.lastName > userNext.lastName) ? -1 : 1);
            });
        break;
      case 'email':
          return users.sort(
            (userPrevious, userNext) => {
              return (order === 'ascendent') ?
                ((userPrevious.email > userNext.email) ? 1 : -1):
                ((userPrevious.email > userNext.email) ? -1 : 1);
            });
      case 'phone':
          return users.sort(
            (userPrevious, userNext) => {
              return (order === 'ascendent') ?
                ((userPrevious.phone > userNext.phone) ? 1 : -1):
                ((userPrevious.phone > userNext.phone) ? -1 : 1);
            });
      default:
        return users;
    }
  }

}
