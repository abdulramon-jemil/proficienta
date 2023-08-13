import { NextResponse } from "next/server"
import { Webhook } from "svix"
import { getSvixHeadersFromRequest } from "./base"

const signingSecret = "whsec_hHrBpRkMu106/nKsHbc6MZiPoog56GHv"

export async function POST(request: Request) {
  const body = await request.text()
  const headers = getSvixHeadersFromRequest(request)

  const wh = new Webhook(signingSecret)

  let verifiedSuccessfully = false
  let message: unknown

  try {
    message = wh.verify(body, headers)
    verifiedSuccessfully = true
  } catch (error) {
    verifiedSuccessfully = false
  }

  // eslint-disable-next-line no-console
  console.log(message as string)

  return NextResponse.json({ applied: verifiedSuccessfully })
}
