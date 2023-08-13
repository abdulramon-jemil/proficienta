// eslint-disable-next-line import/no-extraneous-dependencies
import { type CodegenConfig } from "@graphql-codegen/cli"
import {
  GraphQLCodeGenOutputDir,
  GraphQLDocumentsSources
} from "./graphql.config"

const config: CodegenConfig = {
  schema: {
    [process.env.CODEGEN_GRAFBASE_API_URL as string]: {
      headers: {
        "x-api-key": ""
      }
    }
  },
  generates: {
    [GraphQLCodeGenOutputDir]: {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" }
      },
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

  documents: GraphQLDocumentsSources,
  overwrite: true
}

export default config
