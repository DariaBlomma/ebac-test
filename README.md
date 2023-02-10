# EBAC-test

## Github Pages
https://dariablomma.github.io/ebac-test/

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Technologies that are used
Vue 3, Composition Api, Typescript, Vee-Validate, SCSS

### About the project
This is a user's personal page.
- you can upload your avatar and delete it
- form with personal information has :
  - simple validation of required fields,
  - optional validation of phone number (when it's present),
  - simple handler on submit informs about successful submit and shows data in console.
- form for changing password
  - validation rules: 
    - a new password should match 3 requirements (shown in the form), their color (red or green) changes on typing to show if you match the requirements
    - fields new password and confirm new password should match
    - current password should match the saved value
    - required fields
- the markup is done with flexbox and grid, is adaptive
- code is validated with eslint and ts lint automatically on push to master and pull requests to all branches with the help of GilHub Actions
 
