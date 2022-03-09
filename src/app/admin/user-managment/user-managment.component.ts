import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { AdminService } from '../../services/admin.service';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css'],
})
export class UserManagmentComponent implements OnInit {
  users!: Partial<User[]>;
  bsModalRef!: BsModalRef;
  constructor(
    private adminService: AdminService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users) => {
      this.users = users;
    });
  }

  openRolesModal(user: User | undefined) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(<User>user),
      },
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any[]) => {
      const rolesToUpdate = {
        roles: [
          ...values
            .filter((el: { checked: boolean }) => el.checked === true)
            .map((el: { name: any }) => el.name),
        ],
      };
      if (rolesToUpdate) {
        this.adminService
          .updateUserRoles(<string>user?.username, rolesToUpdate.roles)
          .subscribe(() => {
            (<User>user).roles = [...rolesToUpdate.roles];
          });
      }
    });
  }

  private getRolesArray(user: User) {
    const roles: any[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'Moderator', value: 'Moderator' },
      { name: 'Member', value: 'Member' },
    ];

    availableRoles.forEach((role) => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }

      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    });

    return roles;
  }
}
