import {Pipe, PipeTransform} from '@angular/core';
import {UserListResponse} from "../../../core/models/user.model";

@Pipe({
  name: 'filterSearchPipeUser'
})
export class FilterSearchPipe implements PipeTransform {

  transform(users: UserListResponse[] | null, userNameSearch: string = ''): UserListResponse[] {
    if (users === null) return [];

    if (userNameSearch.length === 0) return users;

    userNameSearch = userNameSearch.trim().toUpperCase();
    const usersFiltered = users.filter(user => {
      const name = user.name.trim().toUpperCase();
      return name.includes(userNameSearch)
    });
    return usersFiltered;
  }

}
