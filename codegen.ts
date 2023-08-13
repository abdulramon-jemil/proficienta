// eslint-disable-next-line import/no-extraneous-dependencies
import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: {
    [process.env.CODEGEN_GRAFBASE_API_URL as string]: {
      headers: {
        "x-api-key": ""
      }
    }
  },
  generates: {
    "./src/graphql-ts/generated/": {
      preset: "client",
      config: {
        arrayInputCoercion: false,
        avoidOptionals: true,
        defaultScalarType: "unknown",
        enumAsTypes: true,
        documentMode: "string",
        scalars: {
          // Grafbase Scalar types
          Date: "string",
          DateTime: "string",
          Email: "string",
          IPAddress: "string",
          Timestamp: "string",
          URL: "string",
          JSON: "Record<string, unknown>",
          PhoneNumber: "string"
        },
        skipTypename: true,
        useTypeImports: true
      }
    }
  },

  documents: [
    "./src/graphql-ts/queries/*.tsx",
    "./src/graphql-ts/mutations/*.tsx"
  ],

  overwrite: true,
  watch: true
}

export default config
