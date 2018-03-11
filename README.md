# Recruitment task for Bravasoft

![Screenshot](http://tth.patrykb.pl/_screenshots/screen-bravasoft.JPG)

The task was to create an Angular app that provides CRUD functionalities for Users and Movies lists.

The live version of the app is hosted on Heroku: click here to see it (warning! The first loading may even take around 2 minutes, due to the fact that Heroku puts unused apps to sleep after some time without any activity).


Below you can read translated description of how I made the app from scratch.

"Welcome to my recruitment task resolution! Here I will tell you something about the whole process that took place during development of this amazing application.
- To create the app skeleton, I used the Angular CLI.
- App is divided in _partes tres_ and supports lazy loading, which means they're only loaded when they're needed.
  - Created modules are as follows:
    - App Module which is the parent of every other one,
    - Home Module, which you are seeing right now,
    - Users Module, which lets you manage Users collection,
    - Movies Module, which lets you manage the Movies collection.
  - I began my work, adding some paths to `tsconfig.json` file, which allowed me to easily import different elements from throughout the app, like `import { Something } from '@interfaces/something'` instead of `import { Something } from '../../../../shared/interfaces/something'`
  - Bootstrap has been added using a traditional way, by adding the `<link>` element in the index.html file. In my Sass files I'm also using Bootstrap's mixins, so I also added the bootstrap-4-grid package from NPM.
  - Users are displayed using the smart table from `@angular/material` package, which handles dynamic data loading and pagination.
  - Angular Material tables only display basic data of Users to improve responsiveness of the displayed page.
  - Edit pages use reactive forms and directives from `@angular/material` package.
  - The backend requires the use of an API key, so I created an HTTP Interceptor that attaches the right Header information to every call.
  - The application is hosted publicly on Heroku, so if the loading took very, very long time - my apologies, but that's just how the free version of Heroku works. :)
