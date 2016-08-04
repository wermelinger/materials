/// <reference path="all.ts"/>

module ContactManagerApp {
    angular.module("contactManagerApp", ["ngMaterial", "ngMdIcons"])
        .service("userService", UserService)
        .controller("mainController", MainController)
        .controller("addUserDialogController", AddUserDialogController)
        .config(($mdIconProvider: angular.material.IIconProvider, $mdThemingProvider: angular.material.IThemingProvider)=> {
            $mdIconProvider
                .defaultIconSet("./app/assets/svg/avatars.svg", 128)
                .icon("menu", "./app/assets/svg/menu.svg", 24);
            $mdThemingProvider.theme("default")
                .primaryPalette("blue")
                .accentPalette("red");
        });
}