# InvenTurboFrontend

All components are under `src/app/components`  

Components are grouped into `common` and `views`(as subfolders):
- `common` is for shared components such as `nav` `header` or `footer`
- `views` is for functional components (register, login, dashboard, inventory, etc.)


Shared styles are in `src/styles/main.scss`, such as the theme color ![#BF202F](https://placehold.it/15/BF202F/000000?text=+)


Data services are under `src/services`, currently there's an auth guard implemented using Firebase.auth to keep track of logged-in user as auth guard











## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
