/// <reference path="all.ts"/>

module ContactManagerApp {
    angular.module("contactManagerApp", ["ngMaterial", "ngMdIcons"])
        .service("userService", UserService)
        .controller("mainController", MainController)
        .controller("addUserDialogController", AddUserDialogController)
        .config(($mdIconProvider: angular.material.IIconProvider, $mdThemingProvider: angular.material.IThemingProvider)=> {
            $mdIconProvider
                .defaultIconSet("./app/assets/svg/avatars.svg", 128)
                .icon("google-plus", "./app/assets/svg/google_plus.svg", 512)
                .icon("hangouts", "./app/assets/svg/hangouts.svg", 512)
                .icon("twitter", "./app/assets/svg/twitter.svg", 512)
                .icon("phone", "./app/assets/svg/phone.svg", 512)
                .icon("menu", "./app/assets/svg/menu.svg", 24);
            $mdThemingProvider.theme("default")
                .primaryPalette("blue")
                .accentPalette("red");
        });
}