/// <reference path="../all.ts" />

module ContactManagerApp {
    export class MainController {
        static $inject = ["userService", "$mdSidenav", "$mdToast", "$mdDialog", "$mdMedia", "$mdBottomSheet"];
        constructor(private userService: IUserService,
                    private $mdSidenav: angular.material.ISidenavService,
                    private $mdToast: angular.material.IToastService,
                    private $mdDialog: angular.material.IDialogService,
                    private $mdMedia: angular.material.IMedia,
                    private $mdBottomSheet: angular.material.IBottomSheetService) {
            var self = this;

            this.userService.loadAllUsers()
                .then((users: User[]) => {
                    self.users = users;
                    self.selected = self.users[0];
                    self.userService.selectedUser = self.selected;
                    console.log(self.users);
                    
                })
        }

        users: User[] = [];
        selected: User = null;
	    newNote: Note = new Note("", null);
        searchText: string = "";
        tabIndex: number = 0;

        toggleSideNav(): void  {
            this.$mdSidenav("left").toggle();
        }

        selectUser(user: User): void {
            this.selected = user;
            this.userService.selectedUser = user;
            var sideNav = this.$mdSidenav("left");
            if (sideNav.isOpen())
            {
                sideNav.close();
            }

            this.tabIndex = 0;
        }

        showContactOptions($event): void {
            this.$mdBottomSheet.show({
                parent: angular.element(document.getElementById("wrapper")),
                templateUrl: "./app/dist/view/contactSheet.html",
                controller: ContactPanelController,
                controllerAs: "cp",
                targetEvent: $event,
                bindToController: true
            })
            .then(clickedItem => {
                // ensure clickedItem is defined
                clickedItem && console.log(clickedItem.name + " clicked");
            })
        }

        formScope: any;

        setFormScope(scope) {
            this.formScope = scope;
        }

        addNote() {
            this.selected.notes.push(this.newNote);

            // Reset the form
            this.formScope.noteForm.$setUntouched();
            this.formScope.noteForm.$setPristine();

            this.newNote = new Note("", null);
            this.openToast("Note added");
        }

        removeNote(note: Note): void {
            var foundIndex = this.selected.notes.indexOf(note);
            this.selected.notes.splice(foundIndex, 1);
            this.openToast("Note was removed");
        }

        openToast(message: string): void {
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(message)
                    .position("top right")
                    .hideDelay(3000)
            );
        }

        clearNotes($event): void {
            var confirm = this.$mdDialog.confirm()
                          .title("Delete all notes")
                          .textContent("All notes are deleted.")
                          .targetEvent($event)
                          .ok("Yes")
                          .cancel("No");
            
            var self = this;
            this.$mdDialog.show(confirm)
                          .then(() => {
                              self.selected.notes = [];
                              self.openToast("Notes cleared");
                          })

        }

        addUser($event): void {
            var self = this;
            var useFullScreen = this.$mdMedia("sm") || this.$mdMedia("xs")

            this.$mdDialog.show({
                templateUrl: "./app/dist/view/newUserDialog.html",
                parent: angular.element(document.body),
                targetEvent: $event, 
                controller: AddUserDialogController,
                controllerAs: "ctrl",
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            }).then((user: CreateUser) => {
                var newUser = User.fromCreate(user);
                self.users.push(newUser);
                self.selectUser(newUser);
                self.openToast("User added");
            }, () => {
                console.log("User cancelled the dialog");
            })
        }
    }
}