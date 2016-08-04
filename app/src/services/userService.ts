/// <reference path="../all.ts" />

module ContactManagerApp {
    export interface IUserService {
        loadAllUsers(): ng.IPromise<User[]>;
        selectedUser: User;
    }

    export class UserService implements IUserService {
        static $inject = ["$q"];
        constructor(private $q: ng.IQService) {

        }

        selectedUser: User = null;

        loadAllUsers() : ng.IPromise<User[]> {
            return this.$q.when(this.users);
        }

        private users: User[] = [
            {
                name: "Erik",
                avatar: "svg-1",
                bio: "blabla",
                notes: [
                    { title: "Pay back dinner", date: new Date("2016-01-12") },
                    { title: "Buy flowers", date: new Date("2016-01-19") },
                ]
            },
            {
                name: "Stefan",
                avatar: "svg-2",
                bio: "Thats me yes bla",
                notes: [
                    { title: "Meet girlfriend", date: new Date("2016-01-12") },
                    { title: "Sleep", date: new Date("2016-02-19") },
                ]
            }            
        ]
    }
}