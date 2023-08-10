## Introduction

This is a [Next.js](https://nextjs.org/) template set up with [Chakra
UI](https://chakra-ui.com/) and the new Next.js App router. It is configured
with the following:

- Eslint
- Chakra UI
- Typescript
- Prettier
- Lint-staged and Husky (for automatically checking code on commit)

> Note that `@/` is used to refer to the `src` directory in the project.

## Chakra UI features

This template follows the instruction given in the Chakra UI [getting started
page for Next.js](https://chakra-ui.com/getting-started/nextjs-guide). The
providers are configured in the `@/controllers/chakra.tsx` file, and are set up
in the `@/app/providers.tsx` file.

There's also a `theme` folder at the root where overrides are configured. This
follows [the Chakra UI
recommendation](https://chakra-ui.com/docs/styled-system/customize-theme#scaling-out-your-project)
for defining custom themes. Only a very tiny override has been configured and
you can modify and add new ones as you wish.

This `@/theme/foundations/font.tsx` file uses
[`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Eslint features

Eslint has been configured in this project to work with typescript using the
`@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` packages. It
also includes the Airbnb eslint config. Finally, the template is configured to
work with import aliases using the `eslint-import-resolver-alias` package. You
can modify the array in `settings["import/resolver"]["alias"]["map"]` in the
`.eslintrc.json` and `compilerOptions.path` object in the `tsconfig.json` file
to add new aliases.

Note that this template is also configured to automatically run `eslint` and
`prettier` on commit (no automatic fixing) using `husky` and `lint-staged`.

You should also see the eslint rules specified in `.eslintrc.json`, and modify
them as needed.

## Usage

To use this template, do the following:

- Clone the repository. Replace `<YOUR_PROJECT_NAME>` in the following command
  with your projct name or `./` if you're in your project folder.

  ```bash
  git clone https://github.com/abdulramon-jemil/next-chakra-template.git <YOUR_PROJECT_NAME>
  ```

- Update the `LICENSE` file if needed (or modify it as needed):

  ```bash
  rm LICENSE
  ```

- Restart the git history:

  ```bash
  rm -rf .git
  git init
  git add .
  git commit -m "Initial commit"
  ```

- Modify `package.json` and `package-lock.json` to show your project's details:

  ```json
  {
    "name": "<YOUR_PROJECT_NAME>",
    "description": "<YOUR_PROJECT_DESCRIPTION>",
    "version": "<YOUR_PROJECT_VERSION>"
  }
  ```

- Modify the project's README as needed or remove it:

  ```bash
  rm README.md
  ```

- Follow the instructions in [Environment Settings](#environment-settings) above
  and make changes based on your needs.

- Install the packages:

  ```bash
  npm install
  ```

- Run the prepare script:

  ```bash
  npm run prepare
  ```

After these, you can start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) or (the necessary port) on
your browser to see the result. You can start editing the page by modifying
`app/page.tsx`.

## Updating packages

The packages included with this template might be outdated by the time you're
using it, make sure to update packages as necessary.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Chakra UI Documentation](https://chakra-ui.com) - learn about Chakra UI
  features and API.

## Contributing

Found an issue somewhere in this template? Please create an issue to let me
know. Your feedback and contributions are welcome!

## Other templates

- [TS Package Template](https://github.com/abdulramon-jemil/ts-package-template)
- [JS Package Template](https://github.com/abdulramon-jemil/js-package-template)
