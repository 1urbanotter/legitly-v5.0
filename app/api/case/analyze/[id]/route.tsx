// Copyright (c) 2024 Legitly. All rights reserved.
// Licensed under the MIT License.

import { NextResponse } from 'next/server'
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai'

const model = new GoogleGenerativeAI(
  process.env.GOOGLE_AI_API_KEY || ''
).getGenerativeModel({ model: 'gemini-pro' })

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: caseId } = params
    const formData = await req.formData()
    const issueDescription = formData.get('issueDescription')?.toString()
    const partiesInvolved = formData.get('partiesInvolved')?.toString()
    const incidentDate = formData.get('incidentDate')?.toString()
    const zipCode = formData.get('zipCode')?.toString()
    const issueImpact = formData.getAll('issueImpact')
    const otherImpact = formData.get('otherImpact')?.toString()
    const desiredResolution = formData.get('desiredResolution')?.toString()

    if (
      !issueDescription ||
      !partiesInvolved ||
      !incidentDate ||
      !zipCode ||
      !desiredResolution
    ) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const prompt = `Analyze the following legal case and provide a comprehensive analysis:

    Issue Description: ${issueDescription}
    Parties Involved: ${partiesInvolved}
    Incident Date: ${incidentDate}
    Zip Code: ${zipCode}
    Issue Impact: ${issueImpact.join(', ')} ${
      otherImpact ? `, ${otherImpact}` : ''
    }
    Desired Resolution: ${desiredResolution}

    Provide the following information:

    1. Legal Analysis: A detailed breakdown of the relevant laws and legal principles.
    2. Legal Strategy: A recommended approach to resolving the issue, including potential legal actions.
    3. Case Strength Identifier: An assessment of the likelihood of success based on the facts and legal analysis.
    4. Actionable Roadmap for Legal Recourse: A step-by-step plan outlining the necessary steps to pursue legal recourse.
    `

    const completion = await model.generateText(prompt)
    console.log('completion', completion)
    const analysis = completion.text

    return NextResponse.json({ analysis })
  } catch (error) {
    return new NextResponse('Error: ' + error, { status: 500 })
  }
}
