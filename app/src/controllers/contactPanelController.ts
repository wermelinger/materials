/// <reference path="../all.ts" />

module ContactManagerApp {
    export class ContactPanelController {
        static $inject = ["userService", "$mdBottomSheet"];
        constructor(private userService: IUserService,
                    private $mdBottomSheet: angular.material.IBottomSheetService) {
            this.user = this.userService.selectedUser;
        }

        user: User;

        actions = [
            { name: "Phone", icon: "phone" },
            { name: "Twitter", icon: "twitter" },
            { name: "Google+", icon: "google-plus" },
            { name: "Hangout", icon: "hangouts" },
        ];

        submitContact(action): void {
            this.$mdBottomSheet.hide(action);
        }
    }
}