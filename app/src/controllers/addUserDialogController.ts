/// <reference path="../all.ts" />

module ContactManagerApp {
    export class AddUserDialogController {
        static $inject = ["$mdDialog"];
        constructor(private $mdDialog: angular.material.IDialogService) {
        }

        user: CreateUser;

        avatars = [
            "svg-1", "svg-2", "svg-3", "svg-4"
        ];

        cancel(): void {
            this.$mdDialog.cancel();
        }

        save(): void {
            this.$mdDialog.hide(this.user);
        }
    }
}